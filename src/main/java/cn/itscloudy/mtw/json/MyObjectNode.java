package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.Iterator;
import java.util.Map;
import java.util.function.BiConsumer;


public class MyObjectNode extends ObjectNode {
    public MyObjectNode(JsonNodeFactory nc) {
        super(nc);
    }

    public int getInt(String fieldName) {
        JsonNode n = get(fieldName);
        if (n == null) {
            return 0;
        }
        if (n.isInt()) {
            return n.asInt();
        }
        return Integer.parseInt(n.asText());
    }

    public void ifHas(String fieldName, BiConsumer<String, JsonNode> consumer) {
        if (has(fieldName)) {
            consumer.accept(fieldName, get(fieldName));
        }
    }

    public String getString(String fieldName) {
        JsonNode n = get(fieldName);
        if (n == null) {
            return null;
        }
        return n.asText();
    }

    public OptionalResult<ArrayNode> getArray(String fieldName) {
        return OptionalResult.of(() -> (ArrayNode) get(fieldName));
    }

    public OptionalResult<String> getOptionalString(String fieldName) {
        return OptionalResult.of(() -> get(fieldName).asText());
    }

    public void forEach(BiConsumer<String, JsonNode> consumer) {
        Iterator<String> itr = fieldNames();
        while (itr.hasNext()) {
            String key = itr.next();
            JsonNode jn = get(key);
            if (jn != null) {
                consumer.accept(key, jn);
            }
        }
    }

    public MyObjectNode deepCopy() {
        MyObjectNode ret = new MyObjectNode(this._nodeFactory);

        for (Map.Entry<String, JsonNode> stringJsonNodeEntry : this._children.entrySet()) {
            ret._children.put(stringJsonNodeEntry.getKey(), (stringJsonNodeEntry.getValue()).deepCopy());
        }
        return ret;
    }

}
