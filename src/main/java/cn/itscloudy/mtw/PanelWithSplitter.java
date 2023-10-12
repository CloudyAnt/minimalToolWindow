package cn.itscloudy.mtw;

import com.intellij.lang.Language;
import com.intellij.openapi.application.ApplicationManager;
import com.intellij.openapi.editor.EditorSettings;
import com.intellij.openapi.editor.actions.IncrementalFindAction;
import com.intellij.openapi.editor.colors.EditorColors;
import com.intellij.openapi.editor.colors.EditorColorsManager;
import com.intellij.openapi.editor.colors.EditorColorsScheme;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.Computable;
import com.intellij.ui.EditorTextField;
import com.intellij.ui.EditorTextFieldProvider;
import com.intellij.ui.JBColor;

import javax.swing.*;
import java.awt.*;
import java.util.Collections;

public class PanelWithSplitter {
    private final Project project;
    private JPanel rootPanel;
    private JPanel topPanel;
    private JPanel middlePanel;
    private JPanel bottomPanel;
    private JPanel tfHolder;

    String code = "public static void main(String[] args) {\n" +
            "    int a = 0;\n" +
            "    int b = 1;\n" +
            "    System.out.println(a + b);\n" +
            "}";

    public PanelWithSplitter(Project project) {
        this.project = project;
        topPanel.setBackground(JBColor.GREEN);
        middlePanel.setBackground(JBColor.BLUE);
        bottomPanel.setBackground(JBColor.CYAN);

        tfHolder.setBackground(JBColor.GRAY);
        tfHolder.setLayout(new BoxLayout(tfHolder, BoxLayout.Y_AXIS));
        EditorTextField tf = createEditorTextField(code);
        tfHolder.add(tf);
    }

    public JPanel getRootPanel() {
        return rootPanel;
    }

    private EditorTextField createEditorTextField(String code) {
        EditorTextField tf = ApplicationManager.getApplication().runReadAction((Computable<EditorTextField>) () ->
                EditorTextFieldProvider.getInstance().getEditorField(Language.findLanguageByID("JAVA"),
                        project, Collections.singletonList(editorEx -> {
                            EditorSettings editorSettings = editorEx.getSettings();
                            editorSettings.setLineNumbersShown(false);
                            editorSettings.setLineMarkerAreaShown(false);
                            editorSettings.setAutoCodeFoldingEnabled(true);
                            editorSettings.setUseSoftWraps(true);
                            editorSettings.setAnimatedScrolling(false);
                            editorSettings.setBlinkCaret(false);
                            editorSettings.setRightMarginShown(false);
                            editorSettings.setShowIntentionBulb(false);
                            editorSettings.setLineNumbersShown(true);
                            editorEx.setViewer(true);
                            editorEx.setCaretVisible(false);
                            editorEx.setCaretEnabled(false);
                            editorEx.putUserData(IncrementalFindAction.SEARCH_DISABLED, Boolean.TRUE);
                            editorEx.setRendererMode(false);
                            EditorColorsScheme scheme = EditorColorsManager.getInstance().getSchemeForCurrentUITheme();
                            Color c = scheme.getColor(EditorColors.READONLY_BACKGROUND_COLOR);
                            editorEx.setBackgroundColor(c != null ? c : scheme.getDefaultBackground());
                            editorEx.setColorsScheme(scheme);
                        })));
        ApplicationManager.getApplication().invokeLater(() -> tf.setText(code));
        return tf;
    }
}
