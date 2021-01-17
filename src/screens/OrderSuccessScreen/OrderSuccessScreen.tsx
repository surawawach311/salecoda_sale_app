import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import Dash from "react-native-dash";
import { currencyFormat } from "../../utilities/CurrencyFormat";
import { TouchableOpacity } from "react-native-gesture-handler";

type OrderSuccessScreenRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "OrderSuccess"
>;

const OrderSuccessScreen: React.FC<OrderSuccessScreenRouteProp> = ({navigation,
  route,
}) => {
  return (
    <View style={styled.container}>
      <View style={styled.headerWarp}>
        {console.log(route.params.data)}
        <TouchableOpacity style={styled.iconCloseContainer} onPress={()=>navigation.navigate("Home")}>
          <Image
            style={styled.iconClose}
            source={require("../../../assets/cancle.png")}
          />
        </TouchableOpacity>
        <Text style={styled.textheader}>รอยืนยันคำสั่งซื้อ</Text>
      </View>
      <View style={styled.bodyContainer}>
        <View style={styled.shopNameWarp}>
          <Text style={styled.textShopName}>
            {route.params.data.shipping_address.name}
          </Text>
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
              <Text style={styled.textProduct}>
                {currencyFormat(item.price)}
              </Text>
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
            {currencyFormat(route.params.data.before_discount)}
          </Text>
        </View>
        <View style={styled.productTextWarp}>
          <Text style={styled.textPrice}>ส่วนลดรวม</Text>
          <Text style={styled.textPrice}>
            {currencyFormat(route.params.data.total_discount)}
          </Text>
        </View>
        <View style={styled.productTextWarp}>
          <Text style={styled.textLabelTotal}>ราคารวม</Text>
          <Text style={styled.textTotal}>{currencyFormat(route.params.data.total_price)}</Text>
        </View>
        <Dash
          dashGap={2}
          dashLength={4}
          dashThickness={1}
          style={styled.lineDash}
          dashColor="#C8CDD6"
        />
        <View style={{ marginTop: 10 }}>
          <Text style={styled.textProductHeader}>ของแถมที่ได้รับ</Text>
          <Image
            style={{
              width: 52,
              height: 52,
              resizeMode: "contain",
              alignSelf: "center",
            }}
            source={require("../../../assets/box-empty.png")}
          />
          <Text style={{ alignSelf: "center", color: "#C2C6CE" }}>
            ไม่มีของแถมที่ได้รับ
          </Text>
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Image
          style={{
            height: 23,
            width: "100%",
            resizeMode: "cover",
          }}
          source={require("../../../assets/bill.png")}
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
    marginHorizontal: 20,
    // borderRadius:6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
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
    // marginVertical: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textProduct: { fontSize: 16, color: "#333333" },
  textPrice: { fontSize: 16, color: "#6B7995" },
  textLabelTotal: { fontSize: 16, fontWeight: "bold" },
  textTotal: { fontSize: 20, fontWeight: "bold", color: "#4C95FF" },
});
