import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Dash from "react-native-dash";
import { ScrollView } from "react-native-gesture-handler";
import ProductCartCard from "../../components/ProductCartCard";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import { currencyFormat } from "../../utilities/CurrencyFormat";
import { ThaiDateFormat } from "../../utilities/ThaiDateFormat";

type OrderSuccessScreenDetailRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "SuccessDetail"
>;

const OrderSuccessScreenDetail: React.FC<OrderSuccessScreenDetailRouteProp> = ({
  navigation,
  route,
}) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const arr1 = route.params.data.created.split("-");
  const arr2 = arr1[2].split(" ");
  
  const sumTotal = () => {
    let total = 0;
    if (route.params.data.items) {
      route.params.data.items.map((item) => {
        total += item.quantity;
      });
    }
    setTotalQuantity(total);
  };

  useEffect(() => {
    sumTotal();
  }, []);

  return (
    <View style={styled.container}>
      <ScrollView>
        <View style={styled.upperContainer}>
          <View style={styled.innerUpperContainer}>
            <View style={styled.orderNumberContainer}>
              <Image
                style={styled.iconInvoice}
                source={require("../../../assets/invoice.png")}
              />
              <Text style={styled.textOrderNumber}>
                {route.params.data.order_no}
              </Text>
            </View>
            <View style={styled.badgeStatus}>
              <Text style={styled.textStatus}>รออนุมัติวงเงิน</Text>
            </View>
          </View>
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ color: "#6B7995" }}>ส่งคำสั่งซื้อ</Text>
          </View>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <View>
            <Text style={styled.textGrayLabel}>ออเดอร์ของ</Text>
            <Text style={styled.textBlack}>
              {route.params.data.shipping_address.name}
            </Text>
            <Text style={styled.textGrayLabel}>เวลาที่เปิดออเดอร์</Text>
            {console.log(arr1)}
            {console.log(arr2)}
            <Text style={styled.textBlack}>{`${ThaiDateFormat(route.params.data.created)} ${arr2[1]}น.`}</Text>
          </View>
        </View>
        <View style={styled.sectionBreak}>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#E5E5E5",
                borderRadius: 13,
                width: 13,
                padding: 13,
                left: -15,
                top: -13,
              }}
            />
            <View
              style={{
                backgroundColor: "#E5E5E5",
                borderRadius: 13,
                width: 13,
                padding: 13,
                right: -15,
                top: -13,
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#FFF",
            marginHorizontal: 18,
            paddingHorizontal: 20,
          }}
        >
          <Text style={styled.textGrayLabel}>การจัดส่ง</Text>
          <Text style={styled.textBlack}>
            {route.params.data.shipping_method}
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={styled.textBlack}>
              {`${route.params.data.shipping_address.line_one} ตำบล${route.params.data.shipping_address.sub_district} อำเภอ${route.params.data.shipping_address.district} ${route.params.data.shipping_address.province} ${route.params.data.shipping_address.post_code} `}
            </Text>
          </View>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <Text style={styled.textGrayLabel}>รายละเอียดสินค้า</Text>
          {/* {console.log(route.params.data)} */}
          {route.params.data != undefined
            ? route.params.data.items.map((product) => {
                return (
                  <ProductCartCard
                    key={product.id}
                    mode="show"
                    title={product.title}
                    pricePerUnit={product.price}
                    priceTotal={product.price * product.quantity}
                    image={product.cover}
                    quantity={product.quantity}
                    saleUnit={product.unit}
                    packingSize={product.packing_size}
                  />
                );
              })
            : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>จำนวนรวม</Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}
            >{`${totalQuantity} ลัง`}</Text>
          </View>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <Text style={styled.textGrayLabel}>วิธีชำระเงิน</Text>
          <Text style={styled.textBlack}>
            {route.params.data.payment_method}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
              marginBottom: 5,
            }}
          >
            <Text>ราคาก่อนลด</Text>
            <Text>{currencyFormat(route.params.data.before_discount)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text>ส่วนลดรวม</Text>
            <Text>{currencyFormat(route.params.data.total_discount)}</Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: "#EBEFF2" }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#616A7B" }}
            >
              ราคารวม
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#4C95FF" }}
            >
              {currencyFormat(route.params.data.total_price)}
            </Text>
          </View>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <View style={{ marginTop: 10, marginBottom: 30 }}>
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
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 18,
            marginBottom: 40,
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: 11,
              width: "100%",
              resizeMode: "cover",
            }}
            source={require("../../../assets/subtract-detail.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderSuccessScreenDetail;

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E5E5" },
  upperContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 18,
    marginTop: 18,
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  innerUpperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textOrderNumber: { fontSize: 16, fontWeight: "bold" },
  badgeStatus: {
    backgroundColor: "#FFE9D8",
    padding: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },
  textStatus: { color: "#FF8824" },
  sectionBreak: {
    backgroundColor: "#FFF",
    marginHorizontal: 18,
  },
  iconInvoice: { height: 20, width: 20, resizeMode: "contain" },
  lineDash: {
    width: "100%",
    height: 1,
    alignSelf: "center",
  },
  textGrayLabel: {
    fontSize: 14,
    color: "#6B7995",
    marginVertical: 15,
  },
  textBlack: {
    fontSize: 20,
  },
  textProductHeader: { fontSize: 18, fontWeight: "bold" },
});
