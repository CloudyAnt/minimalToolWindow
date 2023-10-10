package cn.itscloudy.mtw.drawstring;

import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.EditorCustomElementRenderer;
import com.intellij.openapi.editor.Inlay;
import com.intellij.openapi.editor.colors.EditorColorsManager;
import com.intellij.openapi.editor.colors.EditorColorsScheme;
import com.intellij.openapi.editor.colors.EditorFontType;
import com.intellij.openapi.editor.markup.TextAttributes;
import com.intellij.ui.Gray;
import com.intellij.ui.JBColor;
import org.jetbrains.annotations.NotNull;

import java.awt.*;

public class MyEditorCustomElementRenderer implements EditorCustomElementRenderer {

    final FontMetrics fontMetrics;
    final Font font;
    private final String message;
    private final Color fontColor;

    public MyEditorCustomElementRenderer(String message, Editor editor, JBColor fontColor) {
        this.message = message;
        this.fontColor = fontColor;
        EditorColorsScheme globalScheme = EditorColorsManager.getInstance().getGlobalScheme();
        this.font = globalScheme.getFont(EditorFontType.PLAIN);
        this.fontMetrics = editor.getComponent().getFontMetrics(this.font);
    }

    public MyEditorCustomElementRenderer(String message, Editor editor) {
        this(message, editor, new JBColor(Gray._120, Gray._122));
    }


    @Override
    public int calcWidthInPixels(@NotNull Inlay inlay) {
        if (message.isEmpty()) {
            return 0;
        }

        Editor editor = inlay.getEditor();
        Graphics2D graphics = (Graphics2D) editor.getComponent().getGraphics();
        if (graphics == null) {
            EditorColorsScheme globalColorsScheme = EditorColorsManager.getInstance().getGlobalScheme();
            int editorFontSize = globalColorsScheme.getEditorFontSize();
            return editorFontSize * message.length() * 2;
        } else {
            FontMetrics metrics = graphics.getFontMetrics(this.font);
            int width = metrics.stringWidth(this.message);
            graphics.dispose();
            return width;
        }
    }


    @Override
    public void paint(@NotNull Inlay inlay, @NotNull Graphics graphics_s, @NotNull Rectangle rectangle, @NotNull TextAttributes textAttributes) {
        Graphics2D g = (Graphics2D) graphics_s.create();
        Font font = this.font;
        g.setFont(font);
        FontMetrics fontMetrics = g.getFontMetrics(font);
        g.setColor(fontColor);
        int fontHeight = fontMetrics.getAscent() + fontMetrics.getDescent();
        int lineHeight = inlay.getEditor().getLineHeight();
        int leading = fontMetrics.getLeading();
        // Calculate y positionOffset to vertically center the text within the line
        int yPos = rectangle.y + Math.round(((float) lineHeight + leading - fontHeight) / 2) + fontMetrics.getAscent();
        g.drawString(this.message, rectangle.x, yPos);
    }
}

