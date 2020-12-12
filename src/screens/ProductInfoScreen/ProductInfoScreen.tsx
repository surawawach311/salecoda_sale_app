import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CartDataSource } from "../../datasource/CartDataSource";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";

type ProductInfoScreenNavigationProp = StackScreenProps<
  PurchaseStackParamList,
  "ProductInfo"
>;

const ProductInfoScreen: React.FC<ProductInfoScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  const [quantity, setQuantity] = useState(0);

  const addCart = (action: string) => {
    if (action == "plus") {
      setQuantity((prev) => prev + 1);
      CartDataSource.addToCartByShopId(
        route.params.shop.id,
        route.params.product.id,
        quantity+1
      );
      // (prevQuantity) => {
      //   return prevQuantity + 1;
      // });
    } else {
      setQuantity((prev) => prev - 1);
      CartDataSource.addToCartByShopId(
        route.params.shop.id,
        route.params.product.id,
        quantity-1
      );
    }
  };

  return (
    <>
      <ScrollView style={styled.container}>
        <View>
          <View style={styled.wrapInfo}>
            <View style={styled.imageInfo}>
              {route.params.product.image !== "No" ? (
                <Image
                  style={styled.image}
                  source={{ uri: route.params.product.image }}
                />
              ) : (
                <Image
                  style={styled.image}
                  source={require("../../../assets/empty-product.png")}
                />
              )}
            </View>
            <View>
              <View style={styled.wrapTitlePrice}>
                <Text style={styled.textH1}>{route.params.product.title}</Text>
                <Text style={styled.textH1}>
                  {` ฿${route.params.product.price_per_volumn}`}
                </Text>
              </View>
              <View>
                <Text style={styled.textCommon}>
                  {route.params.product.common_title}
                </Text>
                <Text style={styled.textSize}>
                  {route.params.product.packing_size}
                </Text>
              </View>
            </View>
          </View>
          <View style={styled.containerDescription}>
            <View style={styled.wrapDescriptionHeader}>
              <Text style={styled.textDescriptionHeader}>รายละเอียดสินค้า</Text>
            </View>
            <View style={styled.wrapDescription}>
              <Text style={styled.textH2}>สารสำคัญ</Text>
              <Text style={styled.textH5}>
                {route.params.product.common_title}
              </Text>
              <Text style={styled.textH2}>คุณสมบัติและ ประโยชน์</Text>
              <Text style={styled.textH5}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas malesuada mauris id laoreet tempor. Pellentesque quis
                mauris feugiat purus eleifend cursus. Vivamus vitae aliquam
                ligula. Mauris vel est non leo semper sagittis. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Nam eleifend diam
                ut faucibus iaculis. Donec in nisl mattis, commodo risus ut,
                venenatis nisl. Curabitur non convallis lorem. Nam ac fringilla
                massa, ac pharetra sapien
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <View style={styled.wrapBottom}>
          <View style={styled.safeAreaBottom}>
            <View style={styled.warpQuantity}>
              <TouchableOpacity
                onPress={async () => {
                  await addCart("minus");
                }}
              >
                <Image
                  style={styled.imgIcon}
                  source={require("../../../assets/minus-cart.png")}
                />
              </TouchableOpacity>
              <TextInput
                style={{
                  marginHorizontal: 10,
                  minWidth: 60,
                  alignSelf: "center",
                  textAlign: "center",
                  color: "#616A7B",
                  fontSize: 20,
                  fontWeight: "600",
                }}
                maxLength={5}
                value={quantity.toString()}
                onChangeText={(text) => {
                  setQuantity(Number(text));
                }}
                keyboardType="number-pad"
              />
              <TouchableOpacity
                onPress={async () => {
                  await addCart("plus");
                }}
              >
                <Image
                  style={styled.imgIcon}
                  source={require("../../../assets/add-cart.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart", { shop: route.params.shop })
              }
            >
              <View style={styled.buttonCheckout}>
                <Text style={styled.textButton}>สั่งซื้อสินค้า</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ProductInfoScreen;

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  wrapInfo: {
    flex: 0.7,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  imageInfo: {
    padding: 10,
  },
  wrapTitlePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  textH1: {
    fontSize: 24,
  },
  textCommon: { fontSize: 14, color: "#333333" },
  textSize: { fontSize: 16, color: "#616A7B", marginTop: 10 },
  image: {
    height: 160,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  containerDescription: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  wrapDescriptionHeader: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    padding: 20,
  },
  textDescriptionHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textH2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textH5: { fontSize: 16, color: "#6B7995", marginTop: 20, marginBottom: 20 },
  wrapDescription: {
    padding: 20,
  },

  imgIcon: {
    width: 42,
    height: 42,
  },
  warpQuantity: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  wrapBottom: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    height: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  safeAreaBottom: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  buttonCheckout: {
    width: 160,
    height: 50,
    justifyContent: "center",
    backgroundColor: "#4C95FF",
    borderRadius: 8,
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 18,
    alignSelf: "center",
  },
});
