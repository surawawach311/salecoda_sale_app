import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlightBase,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import Subheading3 from "./Font/Subheading3";

interface ButtonShopProps {
  shopName?: string;
  onPress?: () => void;
}

const ButtonShop: React.FC<ButtonShopProps> = ({ onPress, shopName }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.containter}>
        <View style={styles.warpRight}>
          <Image
            style={styles.iconShop}
            source={require("../../assets/shop.png")}
          />
          {shopName ? (
            <Subheading3 style={styles.shopName}>{shopName.length > 30 ? shopName.substring(0, 30) + "..." : shopName}</Subheading3>
          ) : (
            <Subheading3 style={styles.textChangeShop}>เปลี่ยนร้านค้า</Subheading3>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          {shopName ? (
            <Subheading3 style={styles.textChangeShop}>เปลี่ยนร้านค้า</Subheading3>
          ) : null}
          <Image
            style={styles.iconRight}
            source={require("../../assets/right.png")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  containter: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DBE3EF",
    padding: 10,
    backgroundColor: "#FFFFFF",
    height: 48,
    alignItems: "center",
    flexDirection: "row",
  },
  warpRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  warpLeft: { flex: 1, alignItems: "center" },
  textChangeShop: {
    color: "#6B7995",
  },
  iconShop: { width: 30, height: 30, resizeMode: "contain", marginRight: 10 },
  iconRight: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    justifyContent: "flex-end",
  },
  shopName: { color: "#6B7995", fontSize: 16, fontWeight: "600" },
});
export default ButtonShop;
