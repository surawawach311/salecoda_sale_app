import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonShop from "../../components/ButtonShop";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import ProductCartCard from "../../components/ProductCartCard";
import InputNumber from "../../components/InputNumber";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Cart">;

const CartScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  return (
    <View style={styled.container}>
      <View style={styled.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate("ShopList")} />
      </View>
      <View style={styled.productContainer}>
        <Text>สินค้า</Text>
        <View style={styled.innerProductContainer}>
          <ProductCartCard>
            <InputNumber />
          </ProductCartCard>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styled = StyleSheet.create({
  container: { flex: 1 },
  warpChangeShop: {
    padding: 15,
    backgroundColor: "#F8FAFF",
    width: "100%",
    height: "100%",
    flex: 0.08,
  },
  productContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  innerProductContainer: { marginTop: 30 },
  textProduct: { fontSize: 18 },
});
