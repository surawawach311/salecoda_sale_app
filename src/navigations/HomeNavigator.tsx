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
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false
        }}
      >
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen
          name="Purchase"
          component={PurchaseNavigator}
          
        />
      </HomeStack.Navigator>
    </>
  );
};
export default HomeNavigator;
