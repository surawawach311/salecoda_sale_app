import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PurchaseNavigator from "./PurchaseNavigator";
import HomeNavigator from "./HomeNavigator";

const MainNavigator: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen name="Purchase" component={PurchaseNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
