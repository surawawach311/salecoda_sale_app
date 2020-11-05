import React from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./src/navigations/app-navigator";
import AppIntroSlider from "react-native-app-intro-slider";

export interface AppState {
  isReady: Boolean;
  isShowRealApp: Boolean;
}

const data = [
  {
    title: "ยินดีต้อนรับเข้าสู่ SellCoda",
    text: "สั่งซื้อสินค้าได้ง่ายๆจาก ICPL, ICP Ferzt, ICP Inter",
    image: require("./onboard.png"),
    bg: "#FFFFFF",
  },
  {
    title: "สั่งซื้อออนไลน์",
    text: "สั่งซื้อสินค้าได้ง่ายๆจาก ICPL, ICP Ferzt, ICP Inter",
    image: require("./onboard.png"),
    bg: "#FFFFFF",
  },
  {
    title: "โปรโมชั่น & สิทธิพิเศษ",
    text: "สั่งซื้อสินค้าได้ง่ายๆจาก ICPL, ICP Ferzt, ICP Inter",
    image: require("./onboard.png"),
    bg: "#FFFFFF",
  },
];

type Item = typeof data[0];

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isReady: false,
      isShowRealApp: false,
    };
  }

  slider: AppIntroSlider | undefined;
  _renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={[
          this.styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}
      >
        <Image source={item.image} style={this.styles.image} />
        <Text style={this.styles.title}>{item.title}</Text>
        <Text style={this.styles.text}>{item.text}</Text>
      </View>
    );
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  _renderDoneButton = () => {
    return (
      <View style={this.styles.button}>
        <Text style={{ color: "#FFFFFF" }}>เริ่มต้นใช้งาน</Text>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={this.styles.button}>
        <Text style={{ color: "#FFFFFF" }}>ต่อไป</Text>
      </View>
    );
  };

  _renderSkipButton = () => {
    return (
      <View style={this.styles.buttonSkip}>
        <Text style={{ color: "#000000" }}>ข้าม</Text>
      </View>
    );
  };

  _keyExtractor = (item: Item) => item.title;

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ isShowRealApp: true });
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    } else {
      if (this.state.isShowRealApp) {
        return <AppNavigator />;
      } else {
        return (
          <AppIntroSlider
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            data={data}
            onDone={this._onDone}
            showSkipButton
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            renderSkipButton={this._renderSkipButton}
            nextLabel="ต่อไป"
            skipLabel="ข้าม"
            bottomButton
            activeDotStyle={this.styles.dot}
          />
        );
      }
    }
  }
  styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: "center",
      marginTop: 100,
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
    },
    text: {
      marginTop: 10,
      color: "#616A7B",
      textAlign: "center",
    },
    title: {
      fontSize: 22,
      color: "#000000",
      textAlign: "center",
    },
    button: {
      height: 48,
      backgroundColor: "#4C95FF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      color: "#FFFFFF",
    },
    buttonSkip: {
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      color: "#FFFFFF",
      margin: 5,
    },
  
    dot: {
      width: 20,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
      backgroundColor: "#4C95FF",
    },
  });
}
