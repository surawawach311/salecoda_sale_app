import React from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ShopListScreen from "../screens/ShopListScreen/ShopListScreen";
import ShopScreen from "../screens/ShopScreen/ShopScreen";
import { ShopEntity } from "../entities/ShopEntity";
import { ProductEntity } from "../entities/ProductEntity";
import ProductInfoScreen from "../screens/ProductInfoScreen/ProductInfoScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import CartScreen from "../screens/CartScreen/CartScreen";

export type PurchaseStackParamList = {
  ShopList: undefined;
  Shop: { shop: ShopEntity };
  ProductInfo: { product: ProductEntity; shop: ShopEntity };
  Cart: { shop: ShopEntity };
};

const PurchaseNavigator: React.FC = () => {
  const PurchaseStack = createStackNavigator<PurchaseStackParamList>();

  return (
    <PurchaseStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <PurchaseStack.Screen
        name="ShopList"
        component={ShopListScreen}
        options={{ title: "เลือกร้านค้า" }}
      />
      <PurchaseStack.Screen
        name="Shop"
        component={ShopScreen}
        options={({ navigation, route }) => ({
          title: "สั่งสินค้า",
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart", { shop: route.params.shop })
              }
            >
              <Image
                style={styled.cart}
                source={require("../../assets/shopping-cart.png")}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <PurchaseStack.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
        options={({ navigation, route }) => ({
          title: "",
          headerRight: (props) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart", { shop: route.params.shop })
              }
            >
              <Image
                style={styled.cart}
                source={require("../../assets/shopping-cart.png")}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <PurchaseStack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "ตะกร้าสินค้า" }}
      />
    </PurchaseStack.Navigator>
  );
};

const styled = StyleSheet.create({
  cart: { width: 22, height: 22, marginRight: 20, resizeMode: "contain" },
});

export default PurchaseNavigator;
