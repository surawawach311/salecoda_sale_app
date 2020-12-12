import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

interface ProductCartCardProps {
  children?: React.ReactNode;
  title: string;
  pricePerUnit?: string;
  pricePerVolume?: string;
  priceTotal: string;
  image: string;
  quantity: string;
}

const ProductCartCard: React.FC<ProductCartCardProps> = ({
  children,
  title,
  pricePerUnit,
  pricePerVolume,
  image,
  quantity,
  priceTotal,
}) => {
  return (
    <View style={styles.contianer}>
      <View style={styles.warpImg}>
        <Image style={styles.img} source={{ uri: image }} />
      </View>
      <View style={styles.warpInfo}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text>
          <Text style={styles.textPerPrice}>
            {`${pricePerUnit} x ${quantity} ลัง`}
          </Text>
          <Text style={styles.textPerVolum}> {pricePerVolume}</Text>
        </Text>
        <View style={styles.warpQuantity}>
          {children}
          <Text style={styles.textPriceTotal}>{priceTotal}</Text>
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
  textTitle: { fontSize: 18, fontWeight: "bold" },
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
