import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PurchaseNavigator from "./PurchaseNavigator";
import HomeScreen from "../screens/HomeScreen/HomeSrceen";

export type HomeStackParamList = {
  Home: undefined;
  Purchase: undefined;
};

const HomeNavigator: React.FC = () => {
  const HomeStack = createStackNavigator<HomeStackParamList>();

  return (
    <>
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Purchase" component={PurchaseNavigator} options={{ title: 'เลือกร้านค้า' }} />
      </HomeStack.Navigator>
    </>
  );
};
export default HomeNavigator;
