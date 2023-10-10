package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class MyArrayNode extends ArrayNode {
    public MyArrayNode(JsonNodeFactory nf) {
        super(nf);
    }

    public boolean contains(String s) {
        Iterator<JsonNode> iterator = elements();
        while (iterator.hasNext()) {
            JsonNode next = iterator.next();
            if (next.isTextual() && next.asText().equals(s)) {
                return true;
            }
        }
        return false;
    }

    public List<String> toStringList() {
        List<String> list = new ArrayList<>();
        Iterator<JsonNode> iterator = elements();
        while (iterator.hasNext()) {
            list.add(iterator.next().asText());
        }
        return list;
    }
}
