package cn.itscloudy.mtw;

import cn.itscloudy.mtw.web.AixCefHandler;
import cn.itscloudy.mtw.web.AixCefManager;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.wm.WindowManager;
import org.cef.CefSettings;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.callback.CefQueryCallback;

import javax.swing.*;
import java.awt.*;

public class WebTest implements MtwContent {
    private final Project project;
    private JPanel root;
    private JPanel page1;
    private JPanel page2;

    WebTest(Project project) {
        this.project = project;
        page1.setLayout(new GridLayout(1, 1));
        page2.setLayout(new GridLayout(1, 1));

        AixCefManager manager = ApplicationManager.getApplication().getService(AixCefManager.class);

        MyCefHandler index = new MyCefHandler("Index");
        if (manager.loadResource("hello.html", index)) {
            page1.add(index.getBrowser().getComponent());
        } else {
            page1.add(new JLabel("Failed to load index.html"));
        }
        MyCefHandler hello = new MyCefHandler("Hello");
        if (manager.loadHtmlString("<html><body><h1>Hello, World!</h1></body></html>", hello)) {
            page2.add(hello.getBrowser().getComponent());
        } else {
            page2.add(new JLabel("Failed to load hello.html"));
        }
    }

    @Override
    public String getName() {
        return "WebTest";
    }

    @Override
    public JPanel getRootPanel() {
        return root;
    }

    private class MyCefHandler extends AixCefHandler {

        private final String name;
        private MyCefHandler(String name) {
            this.name = name;
        }

        @Override
        protected boolean isValid() {
            return true;
        }

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

        @Override
        public void onQueryCanceled(CefBrowser browser, CefFrame frame, long queryId) {
            super.onQueryCanceled(browser, frame, queryId);
        }

        @Override
        public void onAddressChange(CefBrowser cefBrowser, CefFrame cefFrame, String s) {

        }

        @Override
        public void onTitleChange(CefBrowser cefBrowser, String s) {

        }

        @Override
        public boolean onTooltip(CefBrowser cefBrowser, String s) {
            return false;
        }

        @Override
        public void onStatusMessage(CefBrowser cefBrowser, String s) {

        }

        @Override
        public boolean onConsoleMessage(CefBrowser cefBrowser, CefSettings.LogSeverity logSeverity, String s, String s1, int i) {
            System.out.println(name + " received JavaScript console message: " + s);
            return false;
        }

        @Override
        public boolean onCursorChange(CefBrowser cefBrowser, int i) {
            return false;
        }
    }
}
