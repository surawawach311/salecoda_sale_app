import React, { useRef } from "react";
import { Button } from "native-base";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { InputPhone } from "../../components/InputPhone";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";
import { StackScreenProps } from "@react-navigation/stack";
import { AppAuthParamList } from "../../navigations/AppAuthNavigator";

type InputOtpScreenNavigationProp = StackScreenProps<
  AppAuthParamList,
  "InputTelNumber"
>;

const InputTelNumberScreen = ({
  navigation,
  route,
}: InputOtpScreenNavigationProp) => {
  const [value, setValue] = React.useState<string>("");
  const [isError, setIsError] = React.useState(false);

  const fillZero = (tel: string) => {
    if (tel.length < 10) {
      return `0${tel}`;
    } else {
      return tel;
    }
  };

  const verifyPhoneNo = (tel: string) => {
    const telephoneNo = fillZero(tel);
    VerifiesDataSource.verifyPhoneNo(telephoneNo).then((res) => {
      if (res == undefined) {
        setIsError(true);
      } else {
        setIsError(false);
        navigation.navigate("InputOtp", { userProfile: res });
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            style={styles.backgroundImage}
            source={require("../../../assets/bgOtp.png")}
          />
          <View style={styles.wrapText}>
            <Text style={styles.title}>ลงทะเบียนร้านค้า</Text>
            <Text style={styles.text}>
              ใส่หมายเลขโทรศัพท์ของคุณเพื่อรับ รหัส OTP ยืนยันการลงทะเบียน
            </Text>
            <InputPhone
              value={value}
              onChangeText={(e: string) => setValue(e)}
              maxLength={10}
              autoFocus={true}
              onError={isError}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              style={styles.button}
              onPress={() => {
                Keyboard.dismiss();
                verifyPhoneNo(value);
              }}
            >
              <Text style={styles.textButton}>ขอรหัสOTP</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#FBFBFB",
  },
  backgroundImage: {
    backgroundColor: "#FBFBFB",
    width: "100%",
    // height:undefined,
    resizeMode: "contain",
    position: "absolute",
  },
  wrapText: { flex: 1, padding: 20, marginTop: "30%" },
  btnContainer: {
    flex: 0.01,
    flexDirection: "row",
    alignItems: "flex-end",
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
