import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../../components/Search";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../../components/OrderCard";
import { OrderDataSource } from "../../datasource/OrderDataSource";
import { OrderEntity } from "../../entities/OrderEntity";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigations/HomeNavigator";
import { FilterOrder } from "../../definitions/FilterOrder";
import { OrderFacade } from "../../facade/OrderFacade";
import { ShopOrderCardModel } from "../../models/ShopOrderCard";
import { set } from "react-native-reanimated";

type OrderScreenRouteProp = StackScreenProps<HomeStackParamList, "Order">;

const OrderScreen: React.FC<OrderScreenRouteProp> = ({ navigation }) => {
  const [orderList, setOrderList] = useState<OrderEntity[]>();
  const [shopOrderCard, setShopOrderCard] = useState<ShopOrderCardModel[]>();
  const [filter, setFilter] = useState<FilterOrder>(FilterOrder.territory);
  const [navbutton, setNavbutton] = useState<FilterOrder>(
    FilterOrder.territory
  );
  const [shopName, setShopName] = useState<string>();

  useEffect(() => {
    getAllOrder();
    getAllOrderGroupByShop();
  }, []);

  const getAllOrder = () => {
    OrderDataSource.getAllOrder().then((res) => {
      setOrderList(res);
    });
  };

  const fetchOrderListByShop = (shopId: string) => {
    OrderDataSource.getOrderListByShopId(shopId).then((res) => {
      setFilter(FilterOrder.territory);
      setOrderList(res);
    });
  };

  const getAllOrderGroupByShop = () => {
    OrderFacade.formatShopOrderCard().then((res) => setShopOrderCard(res));
  };
  return (
    <View style={styled.container}>
      <SafeAreaView>
        <Search />
        <View style={styled.filterWraper}>
          <TouchableWithoutFeedback
            onPress={() => {
              setNavbutton(FilterOrder.territory);
              getAllOrder();
              setFilter(FilterOrder.territory);

            }}
            style={styled.filterList}
          >
            {navbutton == FilterOrder.territory ? (
              <Image
                style={styled.icon}
                source={require("../../../assets/location2-active.png")}
              />
            ) : (
              <Image
                style={styled.icon}
                source={require("../../../assets/location2-inactive.png")}
              />
            )}
            <Text
              style={
                navbutton == FilterOrder.territory
                  ? styled.textFilterOrderActive
                  : styled.textFilterOrderInActive
              }
            >
              รายเขต (A04)
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setFilter(FilterOrder.shop);
              setNavbutton(FilterOrder.shop);
              setShopName(undefined);
            }}
            style={styled.filterList}
          >
            {navbutton == FilterOrder.shop ? (
              <Image
                style={styled.icon}
                source={require("../../../assets/shop2-active.png")}
              />
            ) : (
              <Image
                style={styled.icon}
                source={require("../../../assets/shop2-inactive.png")}
              />
            )}

            <Text
              style={
                navbutton == FilterOrder.shop
                  ? styled.textFilterOrderActive
                  : styled.textFilterOrderInActive
              }
            >
              รายร้าน
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {navbutton == FilterOrder.shop ? (
          <View
            style={{
              padding: 10,
              backgroundColor: "#FBFBFB",
              borderColor: "#EEEEEE",
              borderTopWidth: 1,
            }}
          >
            <Text style={{ color: "rgba(107, 121, 149, 0.46)", fontSize: 12 }}>
              คำสั่งซื้อของ
            </Text>
            {shopName == undefined ? (
              <Text style={{ fontSize: 14, color: "rgba(107, 121, 149, 1)" }}>
                ร้านทั้งหมด
              </Text>
            ) : (
              <Text style={{ fontSize: 14, color: "rgba(107, 121, 149, 1)" }}>
                {shopName}
              </Text>
            )}
          </View>
        ) : null}
        <View style={styled.breakLine} />
        <View style={styled.filterStatus}>
          <View style={styled.badgeStatus}>
            <Text style={styled.textStatusActive}>รอยืนยันคำสั่งซื้อ</Text>
          </View>
          <Text style={styled.textStatusInActive}>เปิดออเดอร์แล้ว</Text>
          <Text style={styled.textStatusInActive}>กำลังจัดส่ง</Text>
        </View>
        <View style={styled.breakLine} />
        {filter == FilterOrder.territory ? (
          <ScrollView style={{ marginBottom: 120 }}>
            {orderList != undefined
              ? orderList.map((order: OrderEntity) => {
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
        ) : (
          <ScrollView style={{ height: "100%" }}>
            {shopOrderCard?.map((shop: ShopOrderCardModel) => {
              return (
                <TouchableOpacity
                  key={shop.id}
                  onPress={() => {
                    fetchOrderListByShop(shop.id);
                    setShopName(shop.name);
                  }}
                >
                  <View key={shop.name} style={styled.shopCard}>
                    <View>
                      <Image
                        style={styled.imageNotFound}
                        source={require("../../../assets/empty-product.png")}
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
                          source={require("../../../assets/invoice.png")}
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
        )}
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
  filterList: { flexDirection: "row", justifyContent: "space-between",marginBottom:7},
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
    paddingVertical: 7,
  },
  breakLine: { borderWidth: 1, borderColor: "#EEEEEE", marginVertical: 0 },
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
