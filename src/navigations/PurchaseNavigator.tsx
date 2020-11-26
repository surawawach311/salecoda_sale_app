import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopListScreen from "../screens/ShopListScreen/ShopListScreen";

export type PurchaseStackParamList = {
  ShopList: undefined;
};

const PurchaseNavigator: React.FC = () => {
  const PurchaseStack = createStackNavigator<PurchaseStackParamList>();

  return (
    <PurchaseStack.Navigator>
      <PurchaseStack.Screen name="ShopList" component={ShopListScreen} />
    </PurchaseStack.Navigator>
  );
};

export default PurchaseNavigator;
