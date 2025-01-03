package cn.itscloudy.mtw;

import com.intellij.openapi.project.DumbAware;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.Key;
import com.intellij.openapi.wm.ToolWindow;
import com.intellij.openapi.wm.ToolWindowFactory;
import com.intellij.ui.content.Content;
import com.intellij.ui.content.ContentFactory;
import org.jetbrains.annotations.NotNull;

public class MyToolWindowFactory implements DumbAware, ToolWindowFactory {

    public static final Key<PanelWithSplitter> PwsKey = new Key<>("PanelWithSplitter");

    @Override
    public void createToolWindowContent(@NotNull Project project, @NotNull ToolWindow toolWindow) {
        PanelWithSplitter pws = new PanelWithSplitter(project);
        project.putUserData(PwsKey, pws);

        addContent(pws, toolWindow);
        addContent(new WebTest(project), toolWindow);
    }

    private static void addContent(MtwContent content, @NotNull ToolWindow toolWindow) {
        ContentFactory contentFactory = ContentFactory.getInstance();
        Content panelWithSplitterContent = contentFactory.createContent(content.getRootPanel(),
                content.getName(), false);
        toolWindow.getContentManager().addContent(panelWithSplitterContent);
    }
}
