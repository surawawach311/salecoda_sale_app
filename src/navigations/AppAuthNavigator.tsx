import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InputTelNumberScreen from "../screens/InputTelNumberScreen/InputTelNumberScreen";
import InputOtp from "../screens/InputOtpScreen/InputOtpScreen";
import LoginSuccess from "../screens/LoginSuccessScreen/LoginSuccessScreen";
import { UserEntity } from "../entities/userEntity";

export type RootParamList = {
  InputTelNumber: undefined;
  InputOtp: { userProfile: UserEntity };
  LoginSuccess: undefined;
};

const AppAuthNavigator: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="InputTelNumber" component={InputTelNumberScreen} />
      <Stack.Screen name="InputOtp" component={InputOtp} />
      <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
    </Stack.Navigator>
  );
};

export default AppAuthNavigator;
