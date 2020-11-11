import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

const InputOTPScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/bgOtp.png")}
      >
        <View style={styles.wrapText}>
          <Text style={styles.title}>ใส่รหัส OTP</Text>
          <Text style={styles.text}>
            กรุณาใส่รหัสยืนยันตัวตนที่ถูกส่งไปยัง หมายเลข xxxxxx6588
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
export default InputOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  wrapText: { flex: 1, padding: 20, marginTop: 190 },
  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
  },
  text: {
    color: "#828282",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
});
