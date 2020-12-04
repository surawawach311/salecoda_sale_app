import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopListScreen from "../screens/ShopListScreen/ShopListScreen";
import ShopScreen from "../screens/ShopScreen/ShopScreen";
import { ShopEntity } from "../entities/ShopEntity";
import { ProductEntity } from "../entities/ProductEntity";
import ShopInfoScreen from "../screens/ShopInfoScreen/ShopInfoScreen";

export type PurchaseStackParamList = {
  ShopList: undefined;
  Shop: { shop: ShopEntity };
  ProductInfo: { product: ProductEntity };
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
        options={{ title: "สั่งสินค้า" }}
      />
      <PurchaseStack.Screen
        name="ProductInfo"
        component={ShopInfoScreen}
        options={{ title: "" }}
      />
    </PurchaseStack.Navigator>
  );
};

export default PurchaseNavigator;
