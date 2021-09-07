import React from "react";
import { View, Image, Text } from "react-native";
import Text1 from "./Font/Text1";

const EmptyState: React.FC = () => {
  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        margin: 60,
        justifyContent: "center",
      }}
    >
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../../assets/empty-cart.png")}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text1 style={{ color: "#C2C6CE", fontSize: 14 }}>
          ไม่มีคำสั่งซื้อ
        </Text1>
      </View>
    </View>
  );
};
export default EmptyState

