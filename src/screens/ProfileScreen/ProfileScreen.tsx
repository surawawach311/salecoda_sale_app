import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { UserLocalStorageService } from "../../services/UserLocalStorageService";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigations/HomeNavigator";
import { AppAuthParamList } from "../../navigations/AppAuthNavigator";
import Text1 from "../../components/Font/Text1";

type ProfileScreenRouteProp = RouteProp<HomeStackParamList, "Profile">;

type ProfileScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Profile"
>;
type ProfileScreenProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text1>คุณต้องการออกจากระบบใช่หรือไม่ ?</Text1>
      <TouchableOpacity
        style={styled.confirmOrderButton}
        onPress={() => {
          UserLocalStorageService.deleteAccessToken();
          navigation.navigate("Auth", {
            screen: "InputTelNumber",
          });
        }}
      >
        <Text style={styled.textconfirmOrderButton}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styled = StyleSheet.create({
  confirmOrderButton: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#4C95FF",
    padding: 10,
    margin: 20,
    alignItems: "center",
  },
  textconfirmOrderButton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
