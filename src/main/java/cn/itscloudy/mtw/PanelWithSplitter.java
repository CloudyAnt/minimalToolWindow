package cn.itscloudy.mtw;

import com.intellij.openapi.project.Project;
import com.intellij.ui.JBColor;

import javax.swing.*;

public class PanelWithSplitter {
    private final Project project;
    private JPanel rootPanel;
    private JPanel topPanel;
    private JPanel middlePanel;
    private JPanel bottomPanel;

    public PanelWithSplitter(Project project) {
        this.project = project;
        topPanel.setBackground(JBColor.GREEN);
        middlePanel.setBackground(JBColor.BLUE);
        bottomPanel.setBackground(JBColor.CYAN);
    }

    public JPanel getRootPanel() {
        return rootPanel;
    }
}
