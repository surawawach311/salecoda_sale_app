import React, { useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { AppAuthParamList } from "../../navigations/AppAuthNavigator";

type LoginSuccessScreenNavigationProp = StackScreenProps<
  AppAuthParamList,
  "LoginSuccess"
>;

const LoginSuccessScreen = ({
  navigation,
  route,
}: LoginSuccessScreenNavigationProp) => {
  useEffect(() => {
    Login();
  });
  const Login = () => {
    VerifiesDataSource.login(route.params.userProfile).then((res) => {
      AsyncStorage.setItem("access_token", res.access_token);
      setTimeout(() => {
        navigation.navigate("App");
      }, 3000);
    });
  };

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

  text: { fontSize: 24, alignSelf: "center" },
  containerImg: {
    width: 300,
    height: 320,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default LoginSuccessScreen;
