import React from "react";
import { StyleSheet, Text, Image } from "react-native";
import { Container, View } from "native-base";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import Search from "../../components/Search";
import ButtonShop from "../../components/ButtonShop";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Shop">;

const ShopScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  return (
    <Container>
      <View style={styles.wrapSearch}>
        <Search />
      </View>

      <View style={styles.warpShopHeader}>
        <Image
          style={styles.bgImage}
          source={require("../../../assets/bgShop.png")}
        />
        <Text style={styles.textShopName}>{route.params.shop.name}</Text>
      </View>
      <View style={styles.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate("ShopList")} />
      </View>
      <View style={styles.wrapProduct}></View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapSearch: {
    marginTop: 8,
    flex: 0.2,
  },
  warpShopHeader: {
    flex: 0.5,
  },
  wrapProduct: {
    flex: 1,
  },
  warpChangeShop: {
    padding: 25,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 250,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  textShopName: {
    color: "#FFFFFF",
    fontSize: 20,
    padding: 20,
  },
});

export default ShopScreen;
