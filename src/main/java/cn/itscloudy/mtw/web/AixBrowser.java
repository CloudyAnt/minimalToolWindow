package cn.itscloudy.mtw.web;

import com.intellij.ui.jcef.JBCefBrowser;

import javax.swing.*;

public class AixBrowser {
    private final JBCefBrowser browser;

    public AixBrowser(JBCefBrowser browser) {
        this.browser = browser;
    }

    public void executeJavaScript(String script) {
        browser.getCefBrowser().executeJavaScript(script, browser.getCefBrowser().getURL(), 0);
    }

    public JComponent getComponent() {
        return browser.getComponent();
    }
}
