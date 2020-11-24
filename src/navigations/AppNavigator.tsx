import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CTX, IContextProps } from "../services/UserLocalStorageService";

import AppAuthNavigator from "./AppAuthNavigator";
import HomeNavigator from "./HomeNavigator";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const skipContext = React.useContext(CTX);
  const { skip } = skipContext;

  const authContext = React.useContext(CTX);
  const { token, _authenticate, _logout } = authContext;

  // const [isLogin] = React.useState(false);

  // React.useEffect(() => {
  //   checkAuthToken();
  // }, [isLogin]);

  // const checkAuthToken = async () => {
  // const auth = await UserLocalStorageService.
  // .haveAccessToken().then((res: any) => {
  //   return res;
  // });
  // if (auth) {
  //   setIsLogin(true);
  // }
  // };

  // function _bootstrapAsync() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     console.log(user);
  //     if (user) {
  //       user.getIdToken().then(function(idToken) {
  //         // console.log(idToken);
  //         _authenticate(idToken);
  //       });
  //     } else {
  //       _logout();
  //     }
  //   });
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {token ? (
          <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AppAuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
