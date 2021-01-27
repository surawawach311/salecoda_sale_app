import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../../components/OrderCard";
import { OrderDataSource } from "../../datasource/OrderDataSource";
import { OrderEntity } from "../../entities/OrderEntity";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigations/HomeNavigator";

type OrderScreenRouteProp = StackScreenProps<HomeStackParamList, "Order">;

const OrderScreen: React.FC<OrderScreenRouteProp> = ({ navigation, route }) => {
  const [orderList, setOrderList] = useState<OrderEntity[]>();

  useEffect(() => {
    getAllOrder();
  }, []);

  const getAllOrder = () => {
    OrderDataSource.getAllOrder().then((res) => {
      setOrderList(res);
    });
  };
  return (
    <View style={styled.container}>
      <SafeAreaView>
        <Search />
        <View style={styled.filterWraper}>
          <View style={styled.filterList}>
            <Image
              style={styled.icon}
              source={require("../../../assets/location2.png")}
            />
            <Text style={styled.textFilterOrderActive}>รายเขต (A04)</Text>
          </View>
          <View style={styled.filterList}>
            <Image
              style={styled.icon}
              source={require("../../../assets/shop.png")}
            />
            <Text style={styled.textFilterOrderInActive}>รายร้าน</Text>
          </View>
        </View>
        <View style={styled.breakLine} />
        <View style={styled.filterStatus}>
          <View style={styled.badgeStatus}>
            <Text style={styled.textStatusActive}>รอยืนยันคำสั่งซื้อ</Text>
          </View>
          <Text style={styled.textStatusInActive}>เปิดออเดอร์แล้ว</Text>
          <Text style={styled.textStatusInActive}>กำลังจัดส่ง</Text>
        </View>
        <ScrollView style={{ marginBottom: 120 }}>
          {orderList != undefined
            ? orderList.map((order: OrderEntity) => {
                console.log(order);

                return (
                  <TouchableOpacity
                    key={order.order_no}
                    onPress={() => {
                      navigation.navigate("Purchase", {
                        screen: "SuccessDetail",
                        params: { data: order },
                      });
                    }}
                  >
                    <OrderCard
                      key={order.order_no}
                      orderNumber={order.order_no}
                      createDatetime={order.created}
                      quantity={order.items.length}
                      address={order.buyer}
                      status={order.status}
                    />
                  </TouchableOpacity>
                );
              })
            : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OrderScreen;

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  filterWraper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
  },
  badgeStatus: {
    backgroundColor: "#E3F0FF",
    padding: 8,
    borderRadius: 15,
  },
  textStatusActive: { color: "#4C95FF" },
  textStatusInActive: { color: "#6B7995" },
  filterList: { flexDirection: "row", justifyContent: "space-between" },
  icon: { width: 20, height: 20, resizeMode: "contain" },
  textFilterOrderActive: { fontSize: 16, fontWeight: "bold", color: "#4C95FF" },
  textFilterOrderInActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6B7995",
  },
  filterStatus: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 4,
  },
  breakLine: { borderWidth: 1, borderColor: "#EEEEEE", marginVertical: 5 },
});
