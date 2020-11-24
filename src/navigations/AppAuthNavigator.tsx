import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InputTelNumberScreen from "../screens/InputTelNumber/InputTelNumberScreen";
import InputOtp from "../screens/InputOtpScreen/InputOtpScreen";
import LoginSuccess from "../screens/LoginSuccess/LoginSuccess";

const AppAuthNavigator: React.FC = () => {
  // const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (

          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="InputTelNumber"
              component={InputTelNumberScreen}
            />
            <Stack.Screen name="InputOtp" component={InputOtp} />
            <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
          </Stack.Navigator>

  );
};

export default AppAuthNavigator