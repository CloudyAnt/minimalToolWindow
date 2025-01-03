package cn.itscloudy.mtw.web;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.cef.handler.CefDisplayHandler;
import org.cef.handler.CefMessageRouterHandlerAdapter;

public abstract class AixCefHandler extends CefMessageRouterHandlerAdapter implements CefDisplayHandler {

    @Setter(AccessLevel.PACKAGE)
    @Getter
    private AixBrowser browser;

    /**
     * 是否有效。失效的 handler 会被移除
     *
     * @return 是否有效
     */
    protected abstract boolean isValid();
}
