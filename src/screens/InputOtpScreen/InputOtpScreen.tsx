import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { StackScreenProps } from '@react-navigation/stack'
import { useState } from "react";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";
import { AppAuthParamList } from "../../navigations/AppAuthNavigator";

type InputOtpScreenRouteProp = StackScreenProps<AppAuthParamList, "InputOtp">;

const InputOTPScreen = ({ navigation, route }: InputOtpScreenRouteProp) => {
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onFufill = (value: string) => {
    setValue(value);
    if (value.length >= CELL_COUNT) {
      VerifiesDataSource.verifyOtp(
        route.params.userProfile.telephone,
        value
      ).then((response) => {
        if (response == undefined) {
          setIsError(true);
        } else {
          navigation.navigate("LoginSuccess", {
            userProfile: route.params.userProfile,
          });
        }
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
            {route.params.userProfile.telephone}
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
            onFocus={() => {
              setIsError(false);
            }}
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  !isError ? styles.cell : styles.cellError,
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          {isError ? (
            <Text style={styles.textError}>
              รหัส OTP ไม่ถูกต้องลองใหม่อีกครั้ง
            </Text>
          ) : null}
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
    width:"100%",
    height:240,
    resizeMode: "contain",
  },
  wrapText: { padding: 20, marginTop: 190 },
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
  cellError: {
    marginTop: 30,
    width: 48,
    height: 52,
    lineHeight: 50,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#EB2C21",
    textAlign: "center",
    borderRadius: 8,
  },
  focusCell: {
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  textError: {
    color: "#EB2C21",
    alignSelf: "center",
    marginTop: 15,
    fontSize: 12,
  },
});
