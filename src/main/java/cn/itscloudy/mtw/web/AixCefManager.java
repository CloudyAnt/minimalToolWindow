package cn.itscloudy.mtw.web;

import com.intellij.ui.jcef.JBCefApp;
import com.intellij.ui.jcef.JBCefBrowser;
import com.intellij.ui.jcef.JBCefBrowserBuilder;
import com.intellij.ui.jcef.JBCefClient;
import org.cef.CefApp;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.browser.CefMessageRouter;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefMessageRouterHandlerAdapter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class AixCefManager {
    public static final String SCHEME = "http";
    public static final String DOMAIN = "aixcoder";
    public static final String PREFIX = SCHEME + "://" + DOMAIN + "/";

    public boolean supported() {
        return true;
    }

    private final JBCefClient client;
    private final Map<CefBrowser, AixCefHandler> cefHandlers = new ConcurrentHashMap<>();

    private AixCefManager() {
        client = JBCefApp.getInstance().createClient();
        CefApp.getInstance().registerSchemeHandlerFactory(SCHEME, DOMAIN,
                (b, frame, s, request) -> new AixCefResourceHandler());

        CefMessageRouter router = CefMessageRouter.create();
        client.getCefClient().addMessageRouter(router);
        router.addHandler(new MyCefMessageRouterHandlerAdapter(), true);
    }

    public synchronized boolean loadHtmlString(String html, AixCefHandler cefHandler) {
        cefHandlers.entrySet().removeIf(entry -> !entry.getValue().isValid());
        JBCefBrowser browser = new JBCefBrowserBuilder()
                .setClient(client)
                .setUrl("data:text/html;charset=utf-8," + html)
                .build();
        client.addDisplayHandler(cefHandler, browser.getCefBrowser());
        cefHandler.setBrowser(new AixBrowser(browser));
        cefHandlers.put(browser.getCefBrowser(), cefHandler);
        return true;
    }

    public synchronized boolean loadResource(String resource, AixCefHandler displayHandler) {
        cefHandlers.entrySet().removeIf(entry -> !entry.getValue().isValid());
        JBCefBrowser browser = new JBCefBrowserBuilder()
                .setClient(client)
                .setUrl(PREFIX + resource)
                .setOffScreenRendering(true)
                .build();
        client.addDisplayHandler(displayHandler, browser.getCefBrowser());
        displayHandler.setBrowser(new AixBrowser(browser));
        cefHandlers.put(browser.getCefBrowser(), displayHandler);
        return true;
    }

    private class MyCefMessageRouterHandlerAdapter extends CefMessageRouterHandlerAdapter {

        @Override
        public boolean onQuery(CefBrowser browser, CefFrame frame, long queryId, String request, boolean persistent,
                               CefQueryCallback callback) {
            AixCefHandler handler = cefHandlers.get(browser);
            if (handler != null) {
                return handler.onQuery(browser, frame, queryId, request, persistent, callback);
            }
            return true; // mark as handled
        }

        @Override
        public void onQueryCanceled(CefBrowser browser, CefFrame frame, long queryId) {
            AixCefHandler handler = cefHandlers.get(browser);
            if (handler != null) {
                handler.onQueryCanceled(browser, frame, queryId);
            }
            super.onQueryCanceled(browser, frame, queryId);
        }
    }
}
