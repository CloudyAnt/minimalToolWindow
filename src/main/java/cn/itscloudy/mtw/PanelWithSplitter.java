package cn.itscloudy.mtw;

import cn.itscloudy.mtw.drawstring.MyEditorCustomElementRenderer;
import cn.itscloudy.mtw.http.AixHttpClient;
import cn.itscloudy.mtw.json.MyJson;
import cn.itscloudy.mtw.json.MyObjectNode;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.Inlay;
import com.intellij.openapi.fileEditor.FileEditorManager;
import com.intellij.openapi.progress.ProgressIndicator;
import com.intellij.openapi.progress.ProgressManager;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.Computable;
import com.intellij.openapi.util.NlsContexts;
import com.intellij.ui.JBColor;
import org.apache.commons.io.IOUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.swing.*;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Consumer;

public class PanelWithSplitter {
    private final Project project;
    private JPanel rootPanel;
    private JPanel topPanel;
    private JPanel middlePanel;
    private JPanel bottomPanel;
    private JButton overrideRender;
    private JButton streamRender;
    private JButton clearRender;
    private JButton sendHttpRequests;
    private JButton createThreads;

    private static final String[] lines = new String[]{
            "public static void main(String[] args) {\n",
            "    int a = 0;\n",
            "    int b = 1;\n",
            "    int c = 2;\n",
            "    int d = a + b;\n",
            "    int e = b + c;\n",
            "    int f = a + c;\n",
            "    System.out.println(d);\n",
            "    System.out.println(e);\n",
            "    System.out.println(f);\n",
            "}\n"
    };

    private static List<Inlay<MyEditorCustomElementRenderer>> renderers;
    static Future<?> future;

    public PanelWithSplitter(Project project) {
        this.project = project;
        topPanel.setBackground(JBColor.GREEN);
        middlePanel.setBackground(JBColor.BLUE);
        bottomPanel.setBackground(JBColor.CYAN);

        overrideRender.addActionListener(e -> {
            Editor editor = getSelectedTextEditor();
            ProgressManager.getInstance().run(new Back(project, editor, editor.getCaretModel().getOffset(),
                    "OVERRIDE RENDER", this::overrideRender));
        });

        streamRender.addActionListener(e -> {
            Editor editor = getSelectedTextEditor();
            ProgressManager.getInstance().run(new Back(project, editor, editor.getCaretModel().getOffset(),
                    "OVERRIDE RENDER", this::streamRender));
        });

        clearRender.addActionListener(e -> {
            if (renderers != null) {
                disposeAllInlays();
            }
        });

        sendHttpRequests.addActionListener(e -> {
            InputStream largeFileStream = MyToolWindowFactory.class.getResourceAsStream("/largeFile");
            StringBuilder sBuilder = new StringBuilder();
            try {
                List<String> lines = IOUtils.readLines(largeFileStream, "UTF-8");
                for (String line : lines) {
                    sBuilder.append(line).append("\n");
                }
            } catch (Exception ex) {
                throw new RuntimeException(ex);
            }

            Back httpTest = sendHttpRequest(project, sBuilder);
            ProgressManager.getInstance().run(httpTest);
        });
        createThreads.addActionListener(e -> {
            if (future != null) {
                future.cancel(true);
            }
            future = ApplicationManager.getApplication().executeOnPooledThread(() -> {
                try {
                    Thread.sleep(100);
                    System.out.println("Thread end");
                } catch (InterruptedException ex) {
                    System.out.println("Thread interrupted");
                }
            });
        });
    }

    @NotNull
    private Back sendHttpRequest(Project project, StringBuilder sBuilder) {
        String s = sBuilder.toString();
        return new Back(project, getSelectedTextEditor(), 1, "Http test", b -> {
            int i = 0;
            while (i < 50) {
                MyObjectNode body = MyJson.one("s", s);
                URI uri = URI.create("http://localhost:3000/nothing");
                try {
                    AixHttpClient.getInstance().postJson(uri, Collections.emptyMap(), body, 1000);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
                try {
                    Thread.sleep(100);
                } catch (InterruptedException ex) {
                    throw new RuntimeException(ex);
                }
                i++;
            }
        });
    }

    private void overrideRender(Back back) {
        int offset = back.offset;
        Editor editor = back.editor;

        int loop = 0;
        List<String> mockResult = new ArrayList<>();
        renderers = new ArrayList<>();
        try {
            while (loop < 3) {
                for (String line : lines) {
                    Thread.sleep(300);
                    mockResult.add(line);

                    ApplicationManager.getApplication().invokeLater(() -> {
                        disposeAllInlays();

                        for (int j = 0; j < mockResult.size(); j++) {
                            String l = mockResult.get(j);
                            Inlay<MyEditorCustomElementRenderer> r = editor.getInlayModel()
                                    .addInlineElement(offset + j, true,
                                            new MyEditorCustomElementRenderer(l, editor));
                            renderers.add(r);
                        }
                    });
                }
                loop++;
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    private void streamRender(Back back) {
        int offset = back.offset;
        Editor editor = back.editor;

        int loop = 0;
        renderers = new ArrayList<>();
        try {
            AtomicInteger lineOffsetAtom = new AtomicInteger(-1);
            while (loop < 3) {
                for (String line : lines) {
                    Thread.sleep(300);

                    ApplicationManager.getApplication().invokeLater(() -> {
                        Inlay<MyEditorCustomElementRenderer> r = editor.getInlayModel()
                                .addInlineElement(offset + lineOffsetAtom.incrementAndGet(),
                                        true, new MyEditorCustomElementRenderer(line, editor));
                        renderers.add(r);
                    });
                }
                loop++;
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private static void disposeAllInlays() {
        for (Inlay<MyEditorCustomElementRenderer> inlay : renderers) {
            inlay.dispose();
        }
    }

    private Editor getSelectedTextEditor() {
        FileEditorManager fileEditorManager = FileEditorManager.getInstance(project);

        return ApplicationManager.getApplication().runReadAction((Computable<Editor>)
                fileEditorManager::getSelectedTextEditor);
    }

    public JPanel getRootPanel() {
        return rootPanel;
    }

    private static class Back extends com.intellij.openapi.progress.Task.Backgroundable {

        private final Editor editor;
        private final int offset;
        private final Task task;

        public Back(@Nullable Project project, Editor editor, int offset,
                    @NlsContexts.ProgressTitle @NotNull String title, Consumer<Back> runnable) {
            super(project, title);
            this.editor = editor;
            this.offset = offset;
            this.task = new Task(runnable);
        }

        @Override
        public void run(@NotNull ProgressIndicator indicator) {
            task.run();
        }

        class Task {

            private final Consumer<Back> backConsumer;

            Task(Consumer<Back> backConsumer) {
                this.backConsumer = backConsumer;
            }

            void run() {
                backConsumer.accept(Back.this);
            }
        }
    }
}
