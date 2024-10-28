package cn.itscloudy.mtw;

import org.cef.callback.CefCallback;
import org.cef.handler.CefResourceHandler;
import org.cef.network.CefRequest;
import org.cef.network.CefResponse;
import org.cef.misc.IntRef;
import org.cef.misc.StringRef;

import java.io.InputStream;
import java.net.JarURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class MyResourceHandler implements CefResourceHandler {
    private InputStream inputStream;
    private int contentLength;
    private String mimeType;

    @Override
    public boolean processRequest(CefRequest request, CefCallback callback) {
        try {
            String urlstr = request.getURL();
            URL url = null;
            if (urlstr.startsWith("http://myproject/")) {
                String urlstrSub = urlstr.substring("http://myproject/".length());
                url = getClass().getClassLoader().getResource(urlstrSub);
            }
            if (url == null) {
                url = new URL(urlstr);
            }

            JarURLConnection connection = (JarURLConnection) url.openConnection();
            inputStream = connection.getInputStream();
            contentLength = connection.getContentLength();
            mimeType = getMimeType(url.getPath());
            callback.Continue();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void getResponseHeaders(CefResponse response, IntRef responseLength, StringRef redirectUrl) {
        response.setMimeType(mimeType);
        response.setStatus(200);
        responseLength.set(contentLength);
    }

    @Override
    public boolean readResponse(byte[] dataOut, int bytesToRead, IntRef bytesRead, CefCallback callback) {
        try {
            int bytesToCopy = Math.min(bytesToRead, contentLength);
            int read = inputStream.read(dataOut, 0, bytesToCopy);
            if (read == -1) {
                bytesRead.set(0);
                return false;
            }
            bytesRead.set(read);
            contentLength -= read;
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void cancel() {
        try {
            if (inputStream != null) {
                inputStream.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String getMimeType(String path) {
        Map<String, String> mimeTypes = new HashMap<>();
        mimeTypes.put(".html", "text/html");
        mimeTypes.put(".js", "application/javascript");
        mimeTypes.put(".css", "text/css");
        // Add more mime types as needed
        for (Map.Entry<String, String> entry : mimeTypes.entrySet()) {
            if (path.endsWith(entry.getKey())) {
                return entry.getValue();
            }
        }
        return "application/octet-stream";
    }
}