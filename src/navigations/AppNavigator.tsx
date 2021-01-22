import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserLocalStorageService } from "../services/UserLocalStorageService";

import AppAuthNavigator from "./AppAuthNavigator";
import MainNavigator from "./MainNavigator";

export default function App() {
  const Stack = createStackNavigator();

  const [isLogin, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    checkAuthToken();
  }, [isLogin]);

  const checkAuthToken = async () => {
    const auth = await UserLocalStorageService.haveAccessToken().then((res) => {
      return res;
    });

    if (auth) {
      setIsLogin(true);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLogin ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AppAuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
