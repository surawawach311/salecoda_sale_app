import React from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacityBase,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ShopOrderCardModel } from "../models/ShopOrderCard";

export interface ShopListContainerProps {
  data?: ShopOrderCardModel[];
}

const ShopListContainer: React.FC<ShopListContainerProps> = ({ data }) => {
  return (
    <ScrollView style={{ height: "100%" }}>
      {data?.map((shop: ShopOrderCardModel) => {
        return (
          <TouchableOpacity>
            <View key={shop.name} style={styled.shopCard}>
              <View>
                <Image
                  style={styled.imageNotFound}
                  source={require("../../assets/empty-product.png")}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {shop.name}
                </Text>
                <Text style={{ fontSize: 13, color: "#6B7995" }}>
                  <Text>{shop.territory}</Text>
                  <Text>| {shop.province}</Text>
                </Text>
                <View
                  style={{
                    width: 90,
                    padding: 6,
                    backgroundColor: "#E3F0FF",
                    borderRadius: 4,
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={styled.iconInvoice}
                    source={require("../../assets/invoice.png")}
                  />
                  <Text
                    style={{
                      marginLeft: 4,
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#4C95FF",
                      alignItems: "center",
                    }}
                  >
                    {`${shop.totalOrder} คำสั่งซื้อ`}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ShopListContainer;

const styled = StyleSheet.create({
  shopCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    paddingLeft: 10,
    padding: 20,
    // alignItems: "center",
  },
  imageNotFound: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  iconInvoice: { height: 20, width: 16, resizeMode: "contain" },
});
