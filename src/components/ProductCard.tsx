import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Text,
} from "react-native";

interface ProductCardProps {
  imagePath: string;
  thName: string;
  enName: string;
  productInfo: string;
  price: number;
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
      <View style={styleds.border}>
        <View style={styleds.warpImage}>
          {imagePath != "No" ? (
            <>
              <Image source={{ uri: imagePath }} style={styleds.imageProduct} />
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
          <Text style={styleds.textThName}>{thName}</Text>
          <Text style={styleds.textEnName}>
            {enName.length > 17 ? `${enName.substring(0,15)}...` : enName}
          </Text>
          <Text style={styleds.textEnName}>{productInfo}</Text>
        </View>
        <View style={styleds.warpPrice}>
          <Text style={styleds.textPrice}>฿{price}</Text>
        </View>
      </View>
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
});
export default ProductCard;
