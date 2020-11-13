import React, { useRef } from "react";
import { Button } from "native-base";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";

const LoginSuccessScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.text}>เข้าสู่ระบบสำเร็จ!</Text>
        <View style={styles.containerImg}>
          <Image
            style={styles.image}
            source={require("../../../assets/loginSuccess.png")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  text: { fontSize: 24, alignSelf: "center"},
  containerImg: {
    width: 300,
    height: 320,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
});

export default LoginSuccessScreen;
