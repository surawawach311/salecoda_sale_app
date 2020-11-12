import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InputTelNumberScreen from "../scenes/inputTelNumber/index";
import InputOtp from "../scenes/InputOtp/index"
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="InputTelNumber" component={InputTelNumberScreen} />
        <Stack.Screen name="InputOtp" component={InputOtp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
