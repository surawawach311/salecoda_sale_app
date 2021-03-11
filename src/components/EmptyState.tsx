import React from "react";
import { View, Image, Text } from "react-native";

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
        <Text style={{ color: "#C2C6CE", fontSize: 14 }}>
          ไม่มีคำสั่งซื้อ
        </Text>
        {/* <Text style={{ color: "#C2C6CE", fontSize: 14 }}>
          เลือกซื้อสินค้าที่ร้านซื้อบ่อยได้ด้านล่าง
        </Text> */}
      </View>
    </View>
  );
};
export default EmptyState

