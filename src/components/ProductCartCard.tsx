import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

const ProductCartCard: React.FC<any> = ({ children }) => {
  return (
    <View style={styles.contianer}>
      <View style={styles.warpImg}>
        <Image
          style={styles.img}
          source={require("../../assets/mock-product/hiseed.png")}
        />
      </View>
      <View style={styles.warpInfo}>
        <Text style={styles.textTitle}>ไฮซีส</Text>
        <Text>
          <Text style={styles.textPerPrice}>฿190/ขวด </Text>
          <Text style={styles.textPerVolum}> 0*1 L|฿7,600/ลัง</Text>
        </Text>
        <View style={styles.warpQuantity}>
          {children}
          <Text style={styles.textPriceTotal}>20000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: { flexDirection: "row" },
  warpImg: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    flexWrap: "wrap",
  },
  img: { width: "100%", height: 60, resizeMode: "contain" },
  warpInfo: { padding: 10, flex: 1 },
  textTitle: { fontSize: 18 },
  textPerPrice: { fontSize: 14 },
  textPerVolum: { fontSize: 14, color: "#616A7B" },
  textPriceTotal: { fontSize: 18, color: "#FF5D5D", fontWeight: "bold" },
  warpQuantity: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProductCartCard;
