import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserLocalStorageService } from "../../services/UserLocalStorageService";

type RootStackParamList = {
  InputOtp: { telephone: string };
  LoginSuccess: undefined;
  HomeScreen: undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, "InputOtp">;

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoginSuccess"
>;
type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileWarp}>
        <Image
          style={styles.bgImage}
          source={require("../../../assets/bgHome.png")}
        />
        <View style={styles.innerTextContainer}>
          <Text style={styles.WelcomeHeader}>Hello, Boom</Text>
          <Text style={styles.positionText}>Sale, Marketing executive</Text>
        </View>
        <View style={styles.innerImgContainer}>
          <Image
            style={styles.imageProfile}
            source={require("../../../assets/image-profile-default.png")}
          />
        </View>
      </View>
      <View style={styles.menuWarp}>
        <TouchableOpacity
          // style={{ justifyContent: "center", backgroundColor: "red" }}
          onPress={() => {
            UserLocalStorageService.deleteAccessToken();
          }}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../../assets/menu-icon/order.png")}
          />
          <Text style={styles.textMenu}>สั่งสินค้า</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // style={{ justifyContent: "center", backgroundColor: "red" }}
          onPress={() => {
            UserLocalStorageService.deleteAccessToken();
          }}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../../assets/menu-icon/promotion.png")}
          />
          <Text style={styles.textMenu}>โปรโมชั่น</Text>
        </TouchableOpacity>
        <TouchableOpacity
          // style={{ justifyContent: "center", backgroundColor: "red" }}
          onPress={() => {
            UserLocalStorageService.deleteAccessToken();
          }}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../../assets/menu-icon/shop.png")}
          />
          <Text style={styles.textMenu}>ร้านค้า</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWarp: {
    flex: 0.3,
    backgroundColor: "#4C95FF",
    flexDirection: "row",
    alignItems: "center",
  },
  innerImgContainer: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 20,
  },
  innerTextContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 20,
  },

  WelcomeHeader: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  positionText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  imageProfile: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: "#FFFFFF",
    borderWidth: 1,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  menuWarp: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FBFBFB",
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    top: 200,
    height: "20%",
    left: 0,
    justifyContent: "center",
    paddingTop: 15,
  },
  menuIcon: {
    width: 64,
    height: 64,
    padding: 50,
    margin: 10,
  },
  textMenu: {
    color: "#616A7B",
    marginTop:-20,
    alignSelf:'center',
    fontSize:16
  },
});