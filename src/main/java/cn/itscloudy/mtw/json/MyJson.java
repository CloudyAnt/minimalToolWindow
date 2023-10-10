package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Map;
import java.util.function.Supplier;

public class MyJson {
    private static final ObjectMapper om = new ObjectMapper();
    static {
        om.setNodeFactory(new MyJsonNodeFactory());
    }

    private MyJson() {
    }

    public static boolean checkContains(JsonNode node, String... fields) {
        for (String field : fields) {
            if (!node.has(field)) {
                return false;
            }
        }
        return true;
    }

    public static String toJson(Object o) {
        try {
            return om.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(o.getClass().getSimpleName() + " -×-> json: " + e.getMessage());
        }
    }

    public static String toJson(Object o, Supplier<Object> replacementSupplier) {
        if (o == null) {
            return toJson(replacementSupplier.get());
        }
        return toJson(o);
    }

    public static <T> T toObject(String json, Class<T> tClass) {
        try {
            return om.readValue(json, tClass);
        } catch (IOException e) {
            throw new RuntimeException("Cannot convert " + json + " to " + tClass.getSimpleName() + ": " + e.getMessage());
        }
    }

    /**
     * 返回 static ObjectMapper
     */
    public static ObjectMapper mapper() {
        return om;
    }

    public static MyArrayNode createArrayNode() {
        return (MyArrayNode) om.createArrayNode();
    }

    public static MyObjectNode createObject() {
        return (MyObjectNode) om.createObjectNode();
    }

    public static JsonNode fromTree(String json) {
        try {
            return om.readTree(json);
        } catch (IOException e) {
            throw new RuntimeException("Cannot convert " + json + " to JsonNode");
        }
    }

    public static ArrayNode arrOf(JsonNode node, String... paths) {
        JsonNode jsonNode = nodeOf(node, paths);
        return (ArrayNode) jsonNode;
    }

    public static OptionalResult<ArrayNode> optArrOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> (ArrayNode) nodeOf(node, paths));
    }

    public static JsonNode nodeOf(JsonNode node, String... paths) {
        int i = 0;
        for (; i < paths.length - 1; i++) {
            node = node.get(paths[i]);
        }
        return node.get(paths[i]);
    }

    public static OptionalResult<JsonNode> optNodeOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> nodeOf(node, paths));
    }

    public static String stringOf(JsonNode node, String... paths) {
        int i = 0;
        for (; i < paths.length - 1; i++) {
            node = node.get(paths[i]);
        }
        return node.get(paths[i]).asText();
    }

    public static OptionalResult<String> optStringOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> stringOf(node, paths));
    }

    public static int intOf(JsonNode node, String... paths) {
        return Integer.parseInt(stringOf(node, paths));
    }

    public static OptionalResult<Integer> optIntOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> intOf(node, paths));
    }

    public static long longOf(JsonNode node, String... paths) {
        return Long.parseLong(stringOf(node, paths));
    }

    public static OptionalResult<Long> optLongOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> longOf(node, paths));
    }

    public static boolean boolOf(JsonNode node, String... paths) {
        return Boolean.parseBoolean(stringOf(node, paths));
    }

    public static OptionalResult<Boolean> optBoolOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> boolOf(node, paths));
    }

    public static double doubleOf(JsonNode node, String... paths) {
        return Double.parseDouble(stringOf(node, paths));
    }

    public static OptionalResult<Double> optDoubleOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> doubleOf(node, paths));
    }

    public static float floatOf(JsonNode node, String... paths) {
        return Float.parseFloat(stringOf(node, paths));
    }

    public static OptionalResult<Float> optFloatOf(JsonNode node, String... paths) {
        return OptionalResult.of(() -> floatOf(node, paths));
    }

    public static void addObjectsToArray(ArrayNode node, Object... os) {
        if (os == null) {
            return;
        }
        for (Object o : os) {
            Class<?> oClass = o.getClass();
            if (oClass == String.class) {
                node.add((String) o);
            } else if (oClass == Integer.class) {
                node.add((Integer) o);
            } else if (oClass == Long.class) {
                node.add((Long) o);
            } else if (oClass == Boolean.class) {
                node.add((Boolean) o);
            } else if (oClass == Short.class) {
                node.add((Short) o);
            } else if (oClass == Double.class) {
                node.add((Double) o);
            } else if (oClass == Float.class) {
                node.add((Float) o);
            } else if (oClass == BigInteger.class) {
                node.add((BigInteger) o);
            } else if (oClass == BigDecimal.class) {
                node.add((BigDecimal) o);
            } else {
                throw new RuntimeException("Unsupported type：" + oClass.getName());
            }
        }
    }

    public static ArrayNode are(Object... os) {
        ArrayNode arrayNode = om.createArrayNode();
        addObjectsToArray(arrayNode, os);
        return arrayNode;
    }

    public static void addKeyValueToNode(ObjectNode node, String key, Object value) {
        if (null == value) {
            node.putNull(key);
            return;
        }
        Class<?> vClass = value.getClass();
        if (vClass == String.class) {
            node.put(key, (String) value);
        } else if (vClass == Integer.class) {
            node.put(key, (Integer) value);
        } else if (vClass == Long.class) {
            node.put(key, (Long) value);
        } else if (vClass == Boolean.class) {
            node.put(key, (Boolean) value);
        } else if (vClass == Short.class) {
            node.put(key, (Short) value);
        } else if (vClass == Double.class) {
            node.put(key, (Double) value);
        } else if (vClass == Float.class) {
            node.put(key, (Float) value);
        } else if (vClass == BigInteger.class) {
            node.put(key, (BigInteger) value);
        } else if (vClass == BigDecimal.class) {
            node.put(key, (BigDecimal) value);
        } else if (vClass == byte[].class) {
            node.put(key, (byte[]) value);
        } else {
            throw new RuntimeException("Unsupported type：" + vClass.getName());
        }
    }

    public static ObjectNode one(String key, Object value) {
        ObjectNode node = om.createObjectNode();
        addKeyValueToNode(node, key, value);
        return node;
    }

    public static Builder add(String key, JsonNode anotherNode) {
        Builder builder = new Builder();
        builder.add(key, anotherNode);
        return builder;
    }

    public static Builder add(String key, Object value) {
        Builder builder = new Builder();
        builder.add(key, value);
        return builder;
    }

    public static Builder add(String key, Builder anotherBuilder) {
        Builder builder = new Builder();
        builder.add(key, anotherBuilder);
        return builder;
    }

    public static MyObjectNode one(String key, String value) {
        MyObjectNode node = (MyObjectNode) om.createObjectNode();
        node.put(key, value);
        return node;
    }

    public static Builder empty() {
        return new Builder();
    }

    public static class Builder {

        MyObjectNode node;

        private Builder() {
            this.node = createObject();
        }

        public Builder add(String key, JsonNode anotherNode) {
            node.replace(key, anotherNode);
            return this;
        }

        public Builder add(String key, Object value) {
            MyJson.addKeyValueToNode(node, key, value);
            return this;
        }

        public Builder add(String key, Builder builder) {
            node.set(key, builder.end());
            return this;
        }

        public Builder arr(String key, Object... os) {
            ArrayNode arrayNode = node.putArray(key);
            MyJson.addObjectsToArray(arrayNode, os);
            return this;
        }

        public MyObjectNode are(String key, Object... os) {
            return arr(key, os).end();
        }

        public MyObjectNode end(String key, Builder builder) {
            node.set(key, builder.end());
            return node;
        }

        public Builder end(String key, JsonNode anotherNode) {
            node.replace(key, anotherNode);
            return this;
        }

        public MyObjectNode end(String key, Object value) {
            return add(key, value).end();
        }

        public MyObjectNode end() {
            return node;
        }

        @Override
        public String toString() {
            return node.toString();
        }

        public Map<String, String> toStringMap() {
            return om.convertValue(node, new TypeReference<Map<String, String>>() {
            });
        }

        public Map<String, Object> toObjectMap() {
            return om.convertValue(node, new TypeReference<Map<String, Object>>() {
            });
        }

    }

}
