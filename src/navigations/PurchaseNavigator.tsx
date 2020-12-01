import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopListScreen from "../screens/ShopListScreen/ShopListScreen";
import ShopScreen from "../screens/ShopScreen/ShopScreen";
import { ShopEntity } from "../entities/ShopEntity";

export type PurchaseStackParamList = {
  ShopList: undefined;
  Shop: { shop: ShopEntity };
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
    </PurchaseStack.Navigator>
  );
};

export default PurchaseNavigator;
