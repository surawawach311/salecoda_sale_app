import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserLocalStorageService } from "../services/UserLocalStorageService";

import AppAuthNavigator from "./AppAuthNavigator";
import HomeNavigator from "./HomeNavigator";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    checkAuthToken();
  }, [isLogin]);

  const checkAuthToken = async () => {
    const auth = await UserLocalStorageService.haveAccessToken().then(
      (res: any) => {
        return res;
      }
    );
    if (auth) {
      setIsLogin(true);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLogin ? (
          <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AppAuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
