import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
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
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("./onboard.png"),
    bg: "#59b2ab",
  },
  {
    title: "Title 2",
    text: "Other cool stuff",
    image: require("./onboard.png"),
    bg: "#febe29",
  },
  {
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("./onboard.png"),
    bg: "#22bcb5",
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
  _renderItem = ({item}: {item: Item}) => {
    return (
      <View
        style={[
          this.styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={this.styles.title}>{item.title}</Text>
        <Image source={item.image} style={this.styles.image} />
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
          />
        );
      }
    }
  }
  styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue",
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
    },
    text: {
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: "center",
    },
    title: {
      fontSize: 22,
      color: "white",
      textAlign: "center",
    },
    paginationContainer: {
      position: "absolute",
      bottom: 16,
      left: 16,
      right: 16,
    },
    paginationDots: {
      height: 16,
      margin: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    buttonContainer: {
      flexDirection: "row",
      marginHorizontal: 24,
    },
    button: {
      flex: 1,
      paddingVertical: 20,
      marginHorizontal: 8,
      borderRadius: 24,
      backgroundColor: "#1cb278",
    },
    buttonText: {
      color: "white",
      fontWeight: "600",
      textAlign: "center",
    },
  });
}
