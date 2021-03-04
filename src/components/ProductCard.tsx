import React from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import TagLabel from "./TagLabel";

interface ProductCardProps {
  imagePath: string;
  thName: string;
  enName: string;
  productInfo: string;
  price: number;
  havePromo: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imagePath,
  thName,
  enName,
  productInfo,
  price,
  havePromo,
}) => {
  return (
    <View style={styleds.container}>
      <View style={styleds.border}>
        <View style={styleds.warpImage}>
          {imagePath != "" ? (
            <>
              <Image
                source={{ uri: imagePath }}
                style={styleds.imageProduct}
                resizeMethod={Platform.OS === "android" ? "resize" : "auto"}
              />
            </>
          ) : (
            <>
              <Image
                style={styleds.imageNotFound}
                source={require("../../assets/empty-product.png")}
              />
            </>
          )}
        </View>
        <View style={styleds.warpInfo}>
          <Text numberOfLines={1} style={styleds.textThName}>
            {thName}
          </Text>
          <Text numberOfLines={1} style={styleds.textEnName}>
            {enName}
          </Text>
          <Text style={styleds.textEnName}>{productInfo}</Text>
        </View>
        <View style={styleds.warpPrice}>
          <Text style={styleds.textPrice}>฿{price}</Text>
        </View>
      </View>
      {havePromo && (
        <View style={styleds.warpPromoTag}>
          <TagLabel style={styleds.promoTag}>
            <Text style={styleds.textPromoTag}>Promo</Text>
          </TagLabel>
        </View>
      )}
    </View>
  );
};

const styleds = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  border: {
    borderColor: "#EFF3FD",
    borderWidth: 1,
    height: 230,
    width: 160,
    borderRadius: 10,
    marginRight: 7,
    marginTop: 10,
    marginLeft: 7,
    marginBottom: 10,
  },
  imageProduct: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  imageNotFound: {
    height: 80,
    resizeMode: "contain",
  },
  warpImage: {
    marginTop: 15,
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
    marginTop: 7,
    marginLeft: 10,
  },
  textPrice: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "bold",
  },
  textInfo: { fontSize: 14, color: "#616A7B" },
  warpPromoTag: {
    position: "absolute",
    top: 18,
    right: 14,
  },
  promoTag: {
    backgroundColor: "#6D3DEF",
  },
  textPromoTag: {
    color: "#FFF",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default ProductCard;
