package cn.itscloudy.mtw;

import cn.itscloudy.mtw.json.AixJson;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.EditorCustomElementRenderer;
import com.intellij.openapi.editor.Inlay;
import com.intellij.openapi.editor.colors.EditorFontType;
import com.intellij.openapi.editor.markup.TextAttributes;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.Key;
import com.intellij.openapi.util.NlsSafe;
import com.intellij.openapi.util.SystemInfoRt;
import com.intellij.openapi.wm.WindowManager;
import com.intellij.ui.JBColor;
import com.intellij.ui.jcef.JBCefApp;
import com.intellij.ui.jcef.JBCefBrowser;
import com.intellij.ui.jcef.JBCefBrowserBuilder;
import com.intellij.ui.jcef.JBCefClient;
import com.intellij.util.ui.UIUtil;
import org.cef.CefApp;
import org.cef.CefSettings;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.browser.CefMessageRouter;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefDisplayHandler;
import org.cef.handler.CefMessageRouterHandlerAdapter;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.swing.*;
import java.awt.*;

public class PanelWithSplitter implements MtwContent{
    private final Project project;
    private JPanel rootPanel;
    private JPanel middlePanel;
    private Inlay<MyRenderer> inlay;
    private JBCefBrowser browser;

    public PanelWithSplitter(Project project) {
        this.project = project;
        middlePanel.setBackground(JBColor.BLUE);

        MyDisplayHandler handler = new MyDisplayHandler();

        JBCefClient cefClient = JBCefApp.getInstance().createClient();

        browser = new JBCefBrowserBuilder().setClient(cefClient).build();
        CefApp.getInstance().registerSchemeHandlerFactory("http", "myproject",
                (b, frame, s, request) -> new MyResourceHandler());
//        browser.loadURL("file:///Users/jiaqichai/gitclones/minimalToolWindow/src/main/resources/webview/index.html");
//        browser.loadURL("data:text/html;charset=utf-8," + "<html><body><h1>Hello, World!</h1></body></html>");
        browser.loadURL("http://myproject/webview/index.html");
        cefClient.addDisplayHandler(handler, browser.getCefBrowser());
        middlePanel.setLayout(new BorderLayout());
        middlePanel.add(browser.getComponent(), BorderLayout.CENTER);

        // 创建消息路由器
        CefMessageRouter cefMessageRouter = CefMessageRouter.create();

        // 添加消息处理器
        cefMessageRouter.addHandler(new CefMessageRouterHandlerAdapter() {

            @Override
            public boolean onQuery(CefBrowser browser, CefFrame frame, long queryId, String request, boolean persistent, CefQueryCallback callback) {
                callback.success("Java handled the request");

                Window window = WindowManager.getInstance().getFrame(project);

                System.out.println("I received a message from Jcef");
                ApplicationManager.getApplication().executeOnPooledThread(() -> {
                JOptionPane.showMessageDialog(window, "I received a message from Jcef",
                        "Java Dialog", JOptionPane.INFORMATION_MESSAGE);
                });


                System.out.println("ABC");
                return true; // 表示请求已被处理
            }
        }, true);

        // 将消息路由器添加到浏览器客户端
        browser.getCefBrowser().getClient().addMessageRouter(cefMessageRouter);

//        String message = "\"{\\\"chatSelectionText\\\":\\\"This is the selected text\\\"}\"";
//        Window window = WindowManager.getInstance().getFrame(project);
//
//        System.out.println(message);
//        String ss = """
//                DataCommunication.getMsg("{\\"data\\":\\"{\\\\\\"chatSelectionText\\\\\\":123}\\"}")
//                """;
//        send.addActionListener(e -> {
//            System.out.println("SS: " + ss);
//            browser.getCefBrowser().executeJavaScript(ss, browser.getCefBrowser().getURL(), 0);
//        });
    }


    private static final Key<Font> INLAY_FONT_KEY = Key.create("INLAY_FONT_KEY");
    private static final Key<Font> INLAY_FALLBACK_FONT_KEY = Key.create("INLAY_FALLBACK_FONT_KEY");

    public JPanel getRootPanel() {
        return rootPanel;
    }

    public void showSelection(@Nullable @NlsSafe String selectedText) {
        String text = AixJson.one("chatSelectionText", selectedText).toString();
        String data = AixJson.one("data", text).toString();
        String s = "DataCommunication.getMsg(" + data + ");";
        browser.getCefBrowser().executeJavaScript(s, browser.getCefBrowser().getURL(), 0);
    }

    @Override
    public String getName() {
        return "PanelWithSplitter";
    }

    private static class MyRenderer implements EditorCustomElementRenderer {

        private final int yOffset;
        private Editor editor;
        private Font font;
        private FontMetrics fontMetrics;
        private int lineHeight;

        MyRenderer(Editor editor) {
            this.editor = editor;
            this.font = editor.getColorsScheme().getFont(EditorFontType.PLAIN);
            this.fontMetrics = editor.getContentComponent().getFontMetrics(this.font);
            this.lineHeight = editor.getLineHeight();
            this.yOffset = getBaselineY(fontMetrics, lineHeight);
        }

        @Override
        public void paint(@NotNull Inlay inlay, @NotNull Graphics g, @NotNull Rectangle targetRegion, @NotNull TextAttributes textAttributes) {
            Graphics2D g2 = (Graphics2D) g.create();
            g2.setColor(Color.RED);

            g2.setColor(Color.LIGHT_GRAY);
            // paint background
            g2.fillRect(0, targetRegion.y, editor.getContentComponent().getWidth(), targetRegion.height);

            g2.setFont(font);
            g2.setColor(Color.BLACK);
            g2.drawString("Something changed", targetRegion.x, yOffset + targetRegion.y);
            g2.dispose();
        }

        @Override
        public int calcWidthInPixels(@NotNull Inlay inlay) {
            return 200;
        }
    }

    public static int getBaselineY(FontMetrics fontMetrics, int lineHeight) {
        int fontHeight = fontMetrics.getAscent() + fontMetrics.getDescent();
        return Math.round(((float) lineHeight - fontHeight) / 2) + fontMetrics.getAscent() + fontMetrics.getLeading();
    }

    public static Font getFont(Editor editor, String text) {
        Font font = editor.getUserData(INLAY_FONT_KEY);
        if (font == null) {
            updateEditorFontKeys(editor);
            font = editor.getUserData(INLAY_FONT_KEY);
        }
        if (shouldUseFallback(font, text)) {
            return getFallbackFont(editor);
        }
        return font;
    }

    public static void updateEditorFontKeys(Editor editor) {
        Font font = editor.getColorsScheme().getFont(EditorFontType.PLAIN);
        editor.putUserData(INLAY_FONT_KEY, font);
        editor.putUserData(INLAY_FALLBACK_FONT_KEY, UIUtil.getFontWithFallback(font));
    }

    public static Font getFallbackFont(Editor editor) {
        Font font = editor.getUserData(INLAY_FALLBACK_FONT_KEY);
        if (font == null) {
            updateEditorFontKeys(editor);
            font = editor.getUserData(INLAY_FALLBACK_FONT_KEY);
        }
        return font;
    }

    public static boolean shouldUseFallback(Font font, String text) {
        return !SystemInfoRt.isMac && font.canDisplayUpTo(text) != -1;
    }


    public class MyDisplayHandler implements CefDisplayHandler {
        @Override
        public void onAddressChange(CefBrowser browser, CefFrame frame, String url) {
            // 可选：处理地址变化
        }

        @Override
        public void onTitleChange(CefBrowser browser, String title) {
            // 可选：处理标题变化
        }

        @Override
        public boolean onTooltip(CefBrowser cefBrowser, String s) {
            return false;
        }

        @Override
        public void onStatusMessage(CefBrowser cefBrowser, String s) {
            System.out.println("Status message: " + s);
        }

        @Override
        public boolean onConsoleMessage(CefBrowser cefBrowser, CefSettings.LogSeverity logSeverity, String s, String s1, int i) {
            // 处理来自 JavaScript 的控制台消息
            System.out.println("JavaScript console message: " + s);
            // 返回 false 以继续正常的消息处理
            return false;
        }

        @Override
        public boolean onCursorChange(CefBrowser cefBrowser, int i) {
            return false;
        }

    }


}
