import React, { useRef } from "react";
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
  // const phoneInput = React.useRef<PhoneInput>(null);
  <View style={styles.container}>
    <ImageBackground
      style={styles.image}
      source={require("../../../assets/bgOtp.png")}
    >
      <View style={{ padding: 20,marginTop:-310}}>
        <Text style={styles.title}>ลงทะเบียนสินค้า</Text>
        <Text style={styles.text}>
          ใส่หมายเลขโทรศัพท์ของคุณเพื่อรับ รหัส OTP ยืนยันการลงทะเบียน
        </Text>
        <PhoneInput/>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
    // backgroundColor: "#000000a0",
  },
  text: {
    color: "#828282",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    // backgroundColor: "#000000a0",
  },
});

export default InputTelNumberScreen;
