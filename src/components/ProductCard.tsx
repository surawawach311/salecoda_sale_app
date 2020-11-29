import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Text,
} from "react-native";

interface ProductCardProps {
  imagePath: ImageSourcePropType;
  thName: string;
  enName: string;
  productInfo: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imagePath,
  thName,
  enName,
  productInfo,
  price,
}) => {
  return (
    <View style={styleds.container}>
      <View style={styleds.warpImage}>
        <Image style={styleds.imageProduct} source={imagePath} />
      </View>
      <View style={styleds.warpInfo}>
        <Text style={styleds.textThName}>{thName}</Text>
        <Text style={styleds.textEnName}>{enName}</Text>
        <Text style={styleds.textEnName}>{productInfo}</Text>
      </View>
      <View style={styleds.warpPrice}>
        <Text style={styleds.textPrice}>฿{price}</Text>
      </View>
    </View>
  );
};

const styleds = StyleSheet.create({
  container: {
    borderColor: "#EFF3FD",
    borderWidth: 1,
    height: 250,
    width: 160,
    borderRadius: 10,
    marginRight: 20,
  },
  imageProduct: {
    height: 80,
    resizeMode: "contain",
  },
  warpImage: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  warpInfo: {
    margin: 10,

    alignItems: "center",
    justifyContent: "flex-start",
  },
  textThName: {
    fontSize: 18,
    alignSelf: "flex-start",
    color: "#181725",
    fontWeight: "bold",
  },
  textEnName: {
    fontSize: 14,
    alignSelf: "flex-start",
    color: "#333333",
  },
  warpPrice: {
    marginTop: 30,
    marginLeft: 10,
  },
  textPrice: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "bold",
  },
  textInfo: { fontSize: 14, alignSelf: "flex-start", color: "#616A7B" },
});
export default ProductCard;
