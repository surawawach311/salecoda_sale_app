import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InputTelNumberScreen from "../screens/InputTelNumberScreen/InputTelNumberScreen";
import InputOtpScreen from "../screens/InputOtpScreen/InputOtpScreen";
import LoginSuccessScreen from "../screens/LoginSuccessScreen/LoginSuccessScreen";

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="InputTelNumber" component={InputTelNumberScreen} />
        <Stack.Screen name="InputOtp" component={InputOtpScreen} />
        <Stack.Screen name="LoginSuccess" component={LoginSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
