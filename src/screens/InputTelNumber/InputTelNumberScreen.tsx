import React, { useRef } from "react";
import { Button } from "native-base";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { InputPhone } from "../../components/InputPhone";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserEntity } from "../../entities/userEntity";

type RootStackParamList = {
  InputOtp: { userProfile: UserEntity };
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
  const [isError, setIsError] = React.useState(false);

  const verifyPhoneNo = (tel: string) => {
    VerifiesDataSource.verifyPhoneNo(tel).then((res) => {
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
                // navigation.navigate("InputOtp", { telephone: '0938355808' });
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
