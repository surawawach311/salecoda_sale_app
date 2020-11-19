import React, { useEffect, useRef } from "react";
import { Button } from "native-base";
import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserEntity } from "../../entities/userEntity";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  LoginSuccess: { userProfile: UserEntity };
};

type LoginSuccessRouteProp = RouteProp<RootStackParamList, "LoginSuccess">;

type LoginSuccessNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginSuccess"
>;
type Props = {
  route: LoginSuccessRouteProp;
  navigation: LoginSuccessNavigationProp;
};

const LoginSuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  useEffect(() => {
    Login();
  });

  const Login = () => {
    VerifiesDataSource.login(route.params.userProfile).then((res) => {
      AsyncStorage.setItem("access_token", res);
      navigation.navigate("Home");
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
