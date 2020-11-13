import React, { useRef } from "react";
import { Button } from "native-base";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import { InputPhone } from "../../components/InputPhone";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  InputOtp: { telephone: string };
};

type InputOtpScreenRouteProp = RouteProp<RootStackParamList, "InputOtp">;

type InputOtpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InputOtp"
>;
type Props = {
  route: InputOtpScreenRouteProp;
  navigation: InputOtpScreenNavigationProp;
};

const InputTelNumberScreen: React.FC<Props> = ({ navigation }) => {
  const [value, setValue] = React.useState<string>("");
  const [valid, setValid] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  const verifyPhoneNo = (tel: string) => {
    VerifiesDataSource.verifyPhoneNo(tel).then((res) => {
      navigation.navigate("InputOtp", { telephone: res.telephone });
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/bgOtp.png")}
      >
        <View style={styles.wrapText}>
          <Text style={styles.title}>ลงทะเบียนสินค้า</Text>
          <Text style={styles.text}>
            ใส่หมายเลขโทรศัพท์ของคุณเพื่อรับ รหัส OTP ยืนยันการลงทะเบียน
          </Text>
          <InputPhone
            value={value}
            onChangeText={(e: string) => setValue(e)}
            maxLength={10}
            autoFocus={true}
          />
        </View>
        <View style={styles.wrapButton}>
          <Button
            style={styles.button}
            onPress={() => {
              verifyPhoneNo(value);
              // navigation.navigate("InputOtp", { telephone: '0938355808' });
            }}
          >
            <Text style={styles.textButton}>ขอรหัสOTP</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

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
  wrapButton: {
    flex: 1,
    flexDirection: "row",
  },
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
  textButton: {
    color: "#FFFFFF",
  },
  button: {
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "#4C95FF",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});

export default InputTelNumberScreen;