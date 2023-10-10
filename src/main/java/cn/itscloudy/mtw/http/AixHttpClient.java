package cn.itscloudy.mtw.http;

import cn.itscloudy.mtw.json.MyObjectNode;
import org.apache.http.HttpEntity;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.fluent.Response;
import org.apache.http.entity.ContentType;
import org.jsoup.HttpStatusException;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class AixHttpClient {

    private AixHttpClient() {
    }

    private static AixHttpClient instance;

    public static AixHttpClient getInstance() {
        if (instance == null) {
            instance = new AixHttpClient();
        }
        return instance;
    }

    public String postJson(URI uri, Map<String, String> headers, MyObjectNode bodyNode, int timeoutSeconds)
            throws IOException {

        Request post = Request.Post(uri);
        headers.forEach(post::setHeader);
        String string = bodyNode.toString();
        return post
                .connectTimeout(timeoutSeconds * 1000)
                .socketTimeout(timeoutSeconds * 1000)
                .bodyString(string, ContentType.APPLICATION_JSON)
                .execute().returnContent().toString();
    }

    public String post(URI uri, HttpEntity entity, int timeoutSeconds) throws IOException {

        return Request.Post(uri)
                .connectTimeout(timeoutSeconds * 1000)
                .socketTimeout(timeoutSeconds * 1000)
                .body(entity)
                .execute().returnContent().toString();
    }

    public String get(URI uri, int timeoutSeconds) throws IOException {

        try {
            Response execute = Request.Get(uri)
                    .connectTimeout(timeoutSeconds * 1000)
                    .socketTimeout(timeoutSeconds * 1000)
                    .execute();
            return execute.returnContent().toString();
        } catch (HttpStatusException e) {
            throw e;
        }
    }

    private static String urlEncode(String s) {
        return URLEncoder.encode(s, StandardCharsets.UTF_8);
    }

}
