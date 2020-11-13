import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { VerifyCode } from "../../components/InputOtp";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";




type RootStackParamList = {
  InputOtp: { telephone: string };
  LoginSuccess: undefined;
};

type InputOtpScreenRouteProp = RouteProp<RootStackParamList, "InputOtp">;

type InputOtpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginSuccess"
>;
type Props = {
  route: InputOtpScreenRouteProp;
  navigation: InputOtpScreenNavigationProp;
};

const CELL_COUNT = 6;

const InputOTPScreen: React.FC<Props> = ({ navigation, route }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onFufill = (value: string) => {
    setValue(value);
    if (value.length >= CELL_COUNT) {
      VerifiesDataSource.verifyOtp(route.params.telephone, value).then(() => {
        navigation.navigate("LoginSuccess");
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/bgOtp.png")}
      >
        <View style={styles.wrapText}>
          <Text style={styles.title}>ใส่รหัส OTP</Text>
          <Text style={styles.text}>
            กรุณาใส่รหัสยืนยันตัวตนที่ถูกส่งไปยัง {"\n"}หมายเลข{" "}
            {route.params.telephone}
          </Text>
          <CodeField
            ref={ref}
            {...props}
            autoFocus={true}
            value={value}
            onChangeText={(value) => {
              onFufill(value);
            }}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
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
  root: { flex: 1, padding: 20 },
  titleB: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    marginTop: 30,
    width: 48,
    height: 52,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    textAlign: "center",
    borderRadius: 8,
  },
  focusCell: {
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
});
