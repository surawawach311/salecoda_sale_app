import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./src/navigations/AppNavigator";
import AppIntroSlider from "react-native-app-intro-slider";
import { IntroductionSliderItem } from "./src/models/IntroductionSliderItem";
import { data } from "./src/definitions/IntroductionSliderItem";
import { AppState } from "./src/models/AppState";
import { UserLocalStorageService } from "./src/services/UserLocalStorageService";
import OnBoardingScreen from "./src/screens/OnBoardingScreen/OnBoardingScreen";
import AppAuthNavigator from "./src/navigations/AppAuthNavigator";

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
      return <AppNavigator />;
    }
  }
}
