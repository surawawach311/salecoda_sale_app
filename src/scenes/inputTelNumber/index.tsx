import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import PhoneInput from "react-native-phone-input";

const InputTelNumberScreen = () => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.image}
      source={require("../../../assets/bgOtp.png")}
    >
      <View style={{ flex: 1 }} />
      <PhoneInput style={{ flex: 1 }}/>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    // paddingTop: -221,
    // position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
});

export default InputTelNumberScreen;
