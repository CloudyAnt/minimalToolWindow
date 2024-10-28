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
        ContentFactory contentFactory = ContentFactory.getInstance();
        PanelWithSplitter pws = new PanelWithSplitter(project);
        project.putUserData(PwsKey, pws);
        Content panelWithSplitterContent = contentFactory.createContent(pws.getRootPanel(),
                "PanelWithSplitter", false);
        toolWindow.getContentManager().addContent(panelWithSplitterContent);
    }
}
