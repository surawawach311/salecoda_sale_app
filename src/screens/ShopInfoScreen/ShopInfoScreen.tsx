import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import {} from "react-native-gesture-handler";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";

type ShopInfoScreenNavigationProp = StackScreenProps<
  PurchaseStackParamList,
  "ProductInfo"
>;

const ShopInfoScreen: React.FC<ShopInfoScreenNavigationProp> = ({
  navigation,
  route,
}) => {
  return (
    <ScrollView>
      <View style={styled.container}>
        <View style={styled.wrapInfo}>
          <View style={styled.imageInfo}>
            {route.params.product.image !== "No" ? (
              <Image
                style={styled.image}
                source={{ uri: route.params.product.image }}
              />
            ) : (
              <Image
                style={styled.image}
                source={require("../../../assets/empty-product.png")}
              />
            )}
          </View>
          <View>
            <View style={styled.wrapTitlePrice}>
              <Text style={styled.textH1}>{route.params.product.title}</Text>
              <Text style={styled.textH1}>
                {` ฿${route.params.product.price_per_volumn}`}
              </Text>
            </View>
            <View>
              <Text style={styled.textCommon}>
                {route.params.product.common_title}
              </Text>
              <Text style={styled.textSize}>
                {route.params.product.packing_size}
              </Text>
            </View>
          </View>
        </View>
        <View style={styled.containerDescription}>
          <View style={styled.wrapDescriptionHeader}>
            <Text style={styled.textDescriptionHeader}>รายละเอียดสินค้า</Text>
          </View>
          <View style={styled.wrapDescription}>
            <Text style={styled.textH2}>สารสำคัญ</Text>
            <Text style={styled.textH5}>
              {route.params.product.common_title}
            </Text>
            <Text style={styled.textH2}>คุณสมบัติและ ประโยชน์</Text>
            <Text style={styled.textH5}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              malesuada mauris id laoreet tempor. Pellentesque quis mauris
              feugiat purus eleifend cursus. Vivamus vitae aliquam ligula.
              Mauris vel est non leo semper sagittis. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Nam eleifend diam ut faucibus
              iaculis. Donec in nisl mattis, commodo risus ut, venenatis nisl.
              Curabitur non convallis lorem. Nam ac fringilla massa, ac pharetra
              sapien
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopInfoScreen;

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  wrapInfo: {
    flex: 0.7,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  imageInfo: {
    padding: 10,
  },
  wrapTitlePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  textH1: {
    fontSize: 24,
  },
  textCommon: { fontSize: 14, color: "#333333" },
  textSize: { fontSize: 16, color: "#616A7B", marginTop: 10 },
  image: {
    height: 160,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  containerDescription: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
  },
  wrapDescriptionHeader: {
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    padding: 20,
  },
  textDescriptionHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textH2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textH5: { fontSize: 16, color: "#6B7995", marginTop: 20, marginBottom: 20 },
  wrapDescription: {
    padding: 20,
  },
});
