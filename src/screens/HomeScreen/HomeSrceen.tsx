import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserLocalStorageService } from "../../services/UserLocalStorageService";
import { HomeStackParamList } from "../../navigations/HomeNavigator";
import { VerifiesDataSource } from "../../datasource/VerifiesDataSource";
import { UserEntity } from "../../entities/userEntity";
import { AppLoading } from "expo";

type HomeScreenRouteProp = RouteProp<HomeStackParamList, "Home">;

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;
type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [profile, setProfile] = useState<UserEntity>();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    await VerifiesDataSource.getProfile().then((respone: UserEntity) => {
      setProfile(respone);
    });
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <View style={styles.profileWarp}>
            <Image
              style={styles.bgImage}
              source={require("../../../assets/bgHome.png")}
            />
            <View style={styles.innerTextContainer}>
              <Text
                style={styles.WelcomeHeader}
              >{`Hello, ${profile.name}`}</Text>
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
              onPress={() => {
                navigation.navigate("Purchase", {
                  screen: "ShopList",
                  params: { territory: profile.territory },
                });
              }}
            >
              <Image
                style={styles.menuIcon}
                source={require("../../../assets/menu-icon/order.png")}
              />
              <Text style={styles.textMenu}>สั่งสินค้า</Text>
            </TouchableOpacity>
            <TouchableOpacity
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
        </>
      ) : (
        <AppLoading />
      )}
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWarp: {
    flex: 0.4,
    backgroundColor: "#4C95FF",
    flexDirection: "row",
    alignItems: "center",
  },
  innerImgContainer: {
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FBFBFB",
    flexDirection: "row",
    top: -20,
    justifyContent: "center",
    paddingBottom: 10,
  },
  menuIcon: {
    width: 64,
    height: 64,
    padding: 50,
    margin: 10,
  },
  textMenu: {
    color: "#616A7B",
    marginTop: -20,
    alignSelf: "center",
    fontSize: 16,
  },
});
