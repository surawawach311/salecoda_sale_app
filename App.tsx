import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./src/navigations/AppNavigator";
import { AppState } from "./src/models/AppState";
import { UserLocalStorageService } from "./src/services/UserLocalStorageService";
import { NavigationContainer } from "@react-navigation/native";

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
      isLogin: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    this.checkLogin();
  }

  async checkLogin() {
    const auth = await UserLocalStorageService.haveAccessToken().then((res) => {
      return res;
    });
    if (auth) {
      this.setState({ isLogin: true });
    }
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    } else {

    
      return <NavigationContainer><AppNavigator /></NavigationContainer>;
    }
  }
}
