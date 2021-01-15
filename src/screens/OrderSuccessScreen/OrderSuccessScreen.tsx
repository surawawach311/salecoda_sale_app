import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import Dash from "react-native-dash";

type OrderSuccessScreenRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "OrderSuccess"
>;

const OrderSuccessScreen: React.FC<OrderSuccessScreenRouteProp> = ({
  route,
}) => {
  return (
    <View style={styled.container}>
      <View style={styled.headerWarp}>
        <View style={styled.iconCloseContainer}>
          <Image
            style={styled.iconClose}
            source={require("../../../assets/cancle.png")}
          />
        </View>
        <Text style={styled.textheader}>รอยืนยันคำสั่งซื้อ</Text>
      </View>
      <View style={styled.bodyContainer}>
        <View style={styled.shopNameWarp}>
          <Text style={styled.textShopName}>บริษัท แสงศิริพร จำกัด</Text>
        </View>
        <View style={styled.iconWaitWarp}>
          <Image
            style={styled.iconWait}
            source={require("../../../assets/wait-Confirm.png")}
          />
        </View>
        <View style={styled.iconWaitWarp}>
          <Text style={styled.textDesc}>รอยืนยันคำสั่งซื้อจากร้านค้า</Text>
        </View>
        <Dash
          dashGap={2}
          dashLength={4}
          dashThickness={1}
          style={styled.lineDash}
          dashColor="#C8CDD6"
        />
        <View style={styled.orderNoWarp}>
          <Image
            style={styled.iconInvoice}
            source={require("../../../assets/invoice.png")}
          />
          <Text style={styled.textOrderNumber}>
            {route.params.data.order_no}
          </Text>
        </View>
        <View style={styled.productHeaderWarp}>
          <Text style={styled.textProductHeader}>สินค้า</Text>
          <Text style={styled.textProductHeader}>ราคารวม</Text>
        </View>

        {route.params.data.items.map((item) => {
          return (
            <View style={styled.productTextWarp}>
              <Text
                style={styled.textProduct}
              >{`${item.title} ${item.quantity}x(${item.unit})`}</Text>
              <Text style={styled.textProduct}>{`฿${item.price}`}</Text>
            </View>
          );
        })}
        <Dash
          dashGap={2}
          dashLength={4}
          dashThickness={1}
          style={styled.lineDash}
          dashColor="#C8CDD6"
        />
        <View style={styled.productTextWarp}>
          <Text style={styled.textPrice}>ราคาก่อนลด</Text>
          <Text style={styled.textPrice}>
            {route.params.data.before_discount}
          </Text>
        </View>
        <View style={styled.productTextWarp}>
          <Text style={styled.textPrice}>ส่วนลดรวม</Text>
          <Text style={styled.textPrice}>
            {route.params.data.total_discount}
          </Text>
        </View>
        <View style={styled.productTextWarp}>
          <Text style={styled.textLabelTotal}>ราคารวม</Text>
          <Text style={styled.textTotal}>{route.params.data.total_price}</Text>
        </View>
        <Dash
          dashGap={2}
          dashLength={4}
          dashThickness={1}
          style={styled.lineDash}
          dashColor="#C8CDD6"
        />
      </View>
    </View>
  );
};
export default OrderSuccessScreen;

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4C95FF" },
  headerWarp: {
    flexDirection: "row",
    height: "10%",
    alignItems: "center",
    marginTop: 30,
  },
  iconCloseContainer: { marginLeft: 15, marginRight: 100 },
  iconClose: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  textheader: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  bodyContainer: {
    backgroundColor: "#FFF",
    marginTop: 12,
    margin: 20,
    borderRadius:6,
    // borderTopLeftRadius: 6,
    // borderTopRightRadius: 6,
    padding: 15,
  },
  shopNameWarp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  textShopName: {
    color: "#4C95FF",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconWaitWarp: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconWait: {
    height: 111,
    width: 111,
    resizeMode: "cover",
  },
  textDesc: {
    fontSize: 16,
    color: "#6B7995",
  },
  lineDash: {
    width: "100%",
    height: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  iconInvoice: { height: 20, width: 20, resizeMode: "contain" },
  orderNoWarp: { flexDirection: "row", marginTop: 10 },
  textOrderNumber: { fontWeight: "bold", fontSize: 16, marginLeft: 5 },
  productHeaderWarp: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textProductHeader: { fontSize: 18, fontWeight: "bold" },
  productTextWarp: {
    marginTop: 10,
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textProduct: { fontSize: 16, color: "#333333" },
  textPrice: { fontSize: 16, color: "#6B7995" },
  textLabelTotal: { fontSize: 16, fontWeight: "bold" },
  textTotal: { fontSize: 20, fontWeight: "bold", color: "#4C95FF" },
});
