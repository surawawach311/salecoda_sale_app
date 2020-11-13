import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InputTelNumberScreen from "../screens/InputTelNumber/InputTelNumberScreen";
import InputOtp from "../screens/InputOtpScreen/InputOtpScreen";
import LoginSuccess from "../screens/LoginSuccess/LoginSuccess";

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
        <Stack.Screen name="InputOtp" component={InputOtp} />
        <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
