package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.Map;
import java.util.function.BiConsumer;

/**
 * {@link ObjectNode} 增强
 */
public class AixObjectNode extends ObjectNode {
    public AixObjectNode(JsonNodeFactory nc) {
        super(nc);
    }

    /**
     * @return int。不存在时返回 orElse
     */
    public int getInt(String fieldName, int orElse) {
        JsonNode n = get(fieldName);
        if (n == null) {
            return orElse;
        }
        if (n.isInt()) {
            return n.asInt();
        }
        return Integer.parseInt(n.asText());
    }

    /**
     * @return long。不存在时返回 orElse
     */
    public long getLong(String fieldName, long orElse) {
        JsonNode n = get(fieldName);
        if (n == null) {
            return orElse;
        }
        if (n.isLong()) {
            return n.asLong();
        }
        return Long.parseLong(n.asText());
    }


    public void ifHas(String fieldName, BiConsumer<String, JsonNode> consumer) {
        if (has(fieldName)) {
            consumer.accept(fieldName, get(fieldName));
        }
    }

    /**
     * @return String。不存在时返回 null
     */
    public @Nullable String getString(String fieldName) {
        JsonNode n = get(fieldName);
        if (n == null) {
            return null;
        }
        return n.asText();
    }

    /**
     * @return node。不存在时返回 null
     */
    public AixObjectNode getNode(String fieldName) {
        JsonNode n = get(fieldName);
        if (n == null) {
            return null;
        }
        return (AixObjectNode) n;
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

    public AixObjectNode deepCopy() {
        AixObjectNode ret = new AixObjectNode(this._nodeFactory);

        for (Map.Entry<String, JsonNode> stringJsonNodeEntry : this._children.entrySet()) {
            ret._children.put(stringJsonNodeEntry.getKey(), (stringJsonNodeEntry.getValue()).deepCopy());
        }
        return ret;
    }

    public Map<String, String> toStringMap() {
        return AixJson.toStringMap(this);
    }

    public Map<String, Object> toObjectMap() {
        return AixJson.toObjectMap(this);
    }

    // --- 兼容 FastJson ---




}
