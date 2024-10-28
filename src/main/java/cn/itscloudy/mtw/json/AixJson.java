package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.json.JsonReadFeature;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Collection;
import java.util.Map;
import java.util.function.Supplier;

/**
 * <h1>Jackson 操作器</h1>
 * <b style="color:red">注意</b> Builder 仅针对基础类型、包装类以及 BigInteger 和 BigDecimal
 *
 * @author chaijiaqi
 */
public class AixJson {
    private static final ObjectMapper om = new ObjectMapper();

    static {
        om.setNodeFactory(new AixJsonNodeFactory());
        om.enable(JsonReadFeature.ALLOW_LEADING_ZEROS_FOR_NUMBERS.mappedFeature());
    }

    private AixJson() {
    }

    /**
     * 检查 node 中是否包含所有 fields
     *
     * @return 是否包含
     */
    public static boolean checkContains(JsonNode node, String... fields) {
        for (String field : fields) {
            if (!node.has(field)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 将对象转为 json node
     *
     * @param o 对象
     * @return json
     */
    public static AixObjectNode toJsonNode(Object o) {
        return om.valueToTree(o);
    }

    /**
     * 将对象转为 json
     *
     * @param o 对象
     * @return json
     */
    public static String toJson(Object o) {
        try {
            return om.writeValueAsString(o);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 将对象转为 json
     *
     * @param o                   对象
     * @param replacementSupplier 对象为 null 时代替
     * @return json
     */
    public static String toJson(Object o, Supplier<Object> replacementSupplier) {
        if (o == null) {
            return toJson(replacementSupplier.get());
        }
        return toJson(o);
    }

    /**
     * 将 json 转为对象
     *
     * @param json   json
     * @param tClass 对象类
     * @return 对象
     */
    public static <T> T toObject(String json, Class<T> tClass) {
        try {
            return om.readValue(json, tClass);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 返回 static ObjectMapper
     */
    public static ObjectMapper mapper() {
        return om;
    }

    public static AixArrayNode createArrayNode() {
        return (AixArrayNode) om.createArrayNode();
    }

    public static AixObjectNode createObject() {
        return (AixObjectNode) om.createObjectNode();
    }


    /**
     * 从 node 中读取 arrayNode
     *
     * @return ArrayNode
     * @throws NullPointerException paths 不存在
     */
    public static ArrayNode arrOf(JsonNode node, String... paths) {
        JsonNode jsonNode = nodeOf(node, paths);
        return (ArrayNode) jsonNode;
    }



    /**
     * 从 node 中读取 node
     *
     * @throws NullPointerException paths 不存在
     * @see #optNodeOf(JsonNode, String...)
     */
    public static JsonNode nodeOf(JsonNode node, String... paths) {
        int i = 0;
        for (; i < paths.length - 1; i++) {
            node = node.get(paths[i]);
        }
        return node.get(paths[i]);
    }


    /**
     * 从 node 中读取字符串
     *
     * @throws NullPointerException paths 不存在
     * @see #optStringOf(JsonNode, String...)
     */
    public static String stringOf(JsonNode node, String... paths) {
        int i = 0;
        for (; i < paths.length - 1; i++) {
            node = node.get(paths[i]);
        }
        return node.get(paths[i]).asText();
    }


    /**
     * 从 node 中读取整数
     *
     * @throws NullPointerException  paths 不存在
     * @throws NumberFormatException 值无法被转为 int
     * @see #optIntOf(JsonNode, String...)
     */
    public static int intOf(JsonNode node, String... paths) {
        return Integer.parseInt(stringOf(node, paths));
    }


    /**
     * 从 node 中读取长整数
     *
     * @throws NullPointerException  paths 不存在
     * @throws NumberFormatException 值无法被转为 long
     * @see #optLongOf(JsonNode, String...)
     */
    public static long longOf(JsonNode node, String... paths) {
        return Long.parseLong(stringOf(node, paths));
    }


    /**
     * 从 node 中读取长整数
     *
     * @throws NullPointerException paths 不存在
     * @see #optLongOf(JsonNode, String...)
     */
    public static boolean boolOf(JsonNode node, String... paths) {
        return Boolean.parseBoolean(stringOf(node, paths));
    }


    /**
     * 从 node 中读取 Double
     *
     * @throws NullPointerException  paths 不存在
     * @throws NumberFormatException 值无法被转为 double
     * @see #optDoubleOf(JsonNode, String...)
     */
    public static double doubleOf(JsonNode node, String... paths) {
        return Double.parseDouble(stringOf(node, paths));
    }



    /**
     * 从 node 中读取 Float
     *
     * @throws NullPointerException  paths 不存在
     * @throws NumberFormatException 值无法被转为 float
     * @see #optFloatOf(JsonNode, String...)
     */
    public static float floatOf(JsonNode node, String... paths) {
        return Float.parseFloat(stringOf(node, paths));
    }


    /**
     * 添加值到 arrayNode 中
     */
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
            }
        }
    }

    /**
     * 生成 ArrayNode
     */
    public static ArrayNode are(Object... os) {
        ArrayNode arrayNode = om.createArrayNode();
        addObjectsToArray(arrayNode, os);
        return arrayNode;
    }

    /**
     * 添加键值对到 ObjectNode 中 <p>
     */
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
        } else if (value instanceof Collection) {
            final ArrayNode arrayNode = om.createArrayNode();
            ((Collection<?>) value).forEach(arrayNode::addPOJO);
            node.set(key, arrayNode);
        } else {
        }
    }

    /**
     * 生成只有一个键值对的 JsonNode
     */
    public static AixObjectNode one(String key, Object value) {
        AixObjectNode node = (AixObjectNode) om.createObjectNode();
        addKeyValueToNode(node, key, value);
        return node;
    }

    /**
     * 添加 JsonNode
     */
    public static Builder add(String key, JsonNode anotherNode) {
        Builder builder = new Builder();
        builder.add(key, anotherNode);
        return builder;
    }

    /**
     * 生成 JsonNode Builder
     */
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

    public static AixObjectNode one(String key, String value) {
        AixObjectNode node = (AixObjectNode) om.createObjectNode();
        node.put(key, value);
        return node;
    }

    public static Builder empty() {
        return new Builder();
    }

    public static class Builder {

        AixObjectNode node;

        private Builder() {
            this.node = createObject();
        }

        /**
         * 添加对象
         */
        public Builder add(String key, JsonNode anotherNode) {
            node.replace(key, anotherNode);
            return this;
        }

        /**
         * 添加对象
         */
        public Builder add(String key, Object value) {
            AixJson.addKeyValueToNode(node, key, value);
            return this;
        }

        /**
         * 添加对象
         */
        public Builder add(String key, Object value, boolean skipIfNull) {
            if (skipIfNull && value == null) {
                return this;
            }
            AixJson.addKeyValueToNode(node, key, value);
            return this;
        }

        /**
         * 根据条件添加
         */
        public Builder addIf(boolean condition, String key, Supplier<Object> valueSupplier) {
            if (condition) {
                add(key, valueSupplier.get());
            }
            return this;
        }

        /**
         * 根据条件添加
         */
        public Builder addIf(boolean condition, String key, Object value) {
            if (condition) {
                add(key, value);
            }
            return this;
        }


        /**
         * 添加另一个 builder 的结果
         */
        public Builder add(String key, Builder builder) {
            node.set(key, builder.end());
            return this;
        }

        /**
         * 添加数组
         */
        public Builder arr(String key, Object... os) {
            ArrayNode arrayNode = node.putArray(key);
            AixJson.addObjectsToArray(arrayNode, os);
            return this;
        }

        /**
         * 添加数组并结束
         */
        public AixObjectNode are(String key, Object... os) {
            return arr(key, os).end();
        }

        /**
         * 添加另一个 builder 的结果，并结束
         */
        public AixObjectNode end(String key, Builder builder) {
            node.set(key, builder.end());
            return node;
        }

        /**
         * 添加另一个 JsonNode，并结束
         */
        public AixObjectNode end(String key, JsonNode anotherNode) {
            node.replace(key, anotherNode);
            return node;
        }

        /**
         * 添加一个键值对并结束
         */
        public AixObjectNode end(String key, Object value) {
            return add(key, value).end();
        }

        /**
         * 添加一个键值对并结束
         */
        public AixObjectNode end(String key, Object value, boolean skipIfNull) {
            if (skipIfNull && value == null) {
                return end();
            }
            return add(key, value).end();
        }

        /**
         * 结束
         *
         * @return node
         */
        public AixObjectNode end() {
            return node;
        }

        @Override
        public String toString() {
            return node.toString();
        }

        /**
         * 转为 String-String Map
         */
        public Map<String, String> toStringMap() {
            return AixJson.toStringMap(node);
        }

        /**
         * 转为 String-Object Map
         */
        public Map<String, Object> toObjectMap() {
            return AixJson.toObjectMap(node);
        }

    }

    public static Map<String, String> toStringMap(AixObjectNode node) {
        return om.convertValue(node, new TypeReference<Map<String, String>>() {
        });
    }

    /**
     * 转为 String-Object Map
     */
    public static Map<String, Object> toObjectMap(AixObjectNode node) {
        return om.convertValue(node, new TypeReference<Map<String, Object>>() {
        });
    }

}
