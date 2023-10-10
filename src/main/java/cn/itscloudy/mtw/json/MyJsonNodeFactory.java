package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;

public class MyJsonNodeFactory extends JsonNodeFactory {

    @Override
    public MyArrayNode arrayNode() {
        return new MyArrayNode(this);
    }

    @Override
    public MyObjectNode objectNode() {
        return new MyObjectNode(this);
    }
}
