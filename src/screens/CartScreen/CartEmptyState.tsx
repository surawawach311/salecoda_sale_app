import React from "react";
import { View, Text, Image } from "react-native";

const CartEmptyState: React.FC = () => {
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
        source={require("../../../assets/empty-cart.png")}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#C2C6CE", fontSize: 14 }}>
          ไม่มีสินค้าในตะกร้า
        </Text>
        <Text style={{ color: "#C2C6CE", fontSize: 14 }}>
          เลือกซื้อสินค้าที่ร้านซื้อบ่อยได้ด้านล่าง
        </Text>
      </View>
    </View>
  );
};

export default CartEmptyState
