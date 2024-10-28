package cn.itscloudy.mtw.json;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;

public class AixJsonNodeFactory extends JsonNodeFactory {

    @Override
    public AixArrayNode arrayNode() {
        return new AixArrayNode(this);
    }

    @Override
    public AixObjectNode objectNode() {
        return new AixObjectNode(this);
    }
}
