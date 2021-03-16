import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import Dash from "react-native-dash";
import { currencyFormat } from "../../utilities/CurrencyFormat";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ShopDataSource } from "../../datasource/ShopDataSource";
import { ShopEntity } from "../../entities/ShopEntity";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { AccrodionPriceModel } from "../../models/AccrodionPriceModel";
import AccrodingPrice from "../../components/AccrodingPrice";
import { DiscountOrderEntity } from "../../entities/OrderEntity";

type OrderSuccessScreenRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "OrderSuccess"
>;

const OrderSuccessScreen: React.FC<OrderSuccessScreenRouteProp> = ({
  navigation,
  route,
}) => {
  const [shop, setShop] = useState<ShopEntity>();
  const [specialRequest, setSpecialRequest] = useState<AccrodionPriceModel[]>(
    []
  );
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([]);

  useEffect(() => {
    initialData();
    getShopInfo();
  }, []);

  const formatAccrodion = (data: any[]): AccrodionPriceModel[] => {
    let arrayOutput: any[] = [];
    data.map((item: any) => {
      arrayOutput.push({
        item: `${item.name} (${item.price}฿ x ${item.quantity} ลัง)`,
        price: item.price,
        quantity: item.quantity,
      });
    });
    return arrayOutput;
  };

  const initialData = () => {
    let promo = formatAccrodion(
      route.params.data.discount_memo.filter(
        (item) => item.item_id != null && item.item_id != ""
      )
    );
    let request = formatAccrodion(route.params.data.special_request_discounts);
    setDiscoutPromo(promo);
    setSpecialRequest(request);
  };

  const getShopInfo = () => {
    ShopDataSource.getShopById(
      route.params.data.buyer_id
    ).then((res: ShopEntity) => setShop(res));
  };
  const {
    special_request_discounts,
    discount_memo,
    before_discount,
    total_discount,
    total_price,
    order_no,
    items,
    premium_memo,
    subsidize,
  } = route.params.data;
  return (
    <View style={styled.container}>
      <View style={styled.headerWarp}>
        <TouchableOpacity
          style={styled.iconCloseContainer}
          onPress={() => navigation.navigate("Shop", { shop: shop })}
        >
          <Image
            style={styled.iconClose}
            source={require("../../../assets/cancle.png")}
          />
        </TouchableOpacity>
        <Text style={styled.textheader}>รอยืนยันคำสั่งซื้อ</Text>
      </View>
      <ScrollView>
        <View style={styled.bodyContainer}>
          <View style={styled.shopNameWarp}>
            {shop ? (
              <Text style={styled.textShopName}>{shop?.name}</Text>
            ) : (
              <SkeletonPlaceholder>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 120, height: 30, borderRadius: 4 }} />
                </View>
              </SkeletonPlaceholder>
            )}
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
            <Text style={styled.textOrderNumber}>{order_no}</Text>
          </View>
          <View style={styled.productHeaderWarp}>
            <Text style={styled.textProductHeader}>สินค้า</Text>
            <Text style={styled.textProductHeader}>ราคารวม</Text>
          </View>

          {items.map((item) => {
            return (
              <View key={item.id} style={styled.productTextWarp}>
                <Text
                  style={styled.textProduct}
                >{`${item.title} ${item.quantity}x(${item.unit})`}</Text>
                <Text style={styled.textProduct}>
                  {currencyFormat(item.quantity * item.price)}
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
            <Text style={{ fontSize: 14, color: "#6B7995" }}>ราคาก่อนลด</Text>
            <Text style={styled.textPrice}>
              {currencyFormat(before_discount,2)}
            </Text>
          </View>
          {discount_memo.filter(
            (item: DiscountOrderEntity) => item.item_id != ""
          ).length > 0 ? (
            <AccrodingPrice
              title="ส่วนลดรายการ"
              total={discount_memo
                .filter((item: DiscountOrderEntity) => item.item_id != "")
                .reduce((sum, item) => sum + item.price * item.quantity, 0)}
              detail={discoutPromo}
              price_color={"#3AAE49"}
            />
          ) : null}
          {special_request_discounts.length > 0 ? (
            <AccrodingPrice
              title="ขอส่วนลดพิเศษเพิ่ม"
              total={special_request_discounts.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
              detail={specialRequest}
              price_color={"#BB6BD9"}
            />
          ) : null}
          {subsidize != 0 ? <View style={styled.productTextWarp}>
            <Text style={{ fontSize: 14, color: "#6B7995" }}>ส่วนลดดูแลราคา</Text>
            <Text
              style={{ color: "#FF5D5D", fontSize: 16, fontWeight: "bold" }}
            >
              {currencyFormat(subsidize,2)}
            </Text>
          </View> : null}
          {discount_memo.length > 0
            ? discount_memo
                .filter((item) => item.id == "cash")
                .map((item) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 10,
                      }}
                    >
                      <Text style={styled.textDiscount}>ส่วนลดเงินสด</Text>
                      <Text
                        style={[
                          styled.textDiscountFromCash,
                          { color: "#FF8329" },
                        ]}
                      >
                        {currencyFormat(item.price,2)}
                      </Text>
                    </View>
                  );
                })
            : null}
          <View style={styled.productTextWarp}>
            <Text style={{ fontSize: 14, color: "#6B7995" }}>ส่วนลดรวม</Text>
            <Text
              style={{ color: "#616A7B", fontSize: 16, fontWeight: "bold" }}
            >
              {currencyFormat(total_discount,2)}
            </Text>
          </View>
          <View style={styled.productTextWarp}>
            <Text style={styled.textLabelTotal}>ราคารวม</Text>
            <Text style={styled.textTotal}>{currencyFormat(total_price,2)}</Text>
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
            <View style={{ marginTop: 10 }}>
              {premium_memo.length > 0 ? (
                premium_memo.map((item) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        borderRadius: 6,
                        padding: 10,
                        paddingLeft: 5,
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: 60,
                          height: 60,
                          resizeMode: "contain",
                        }}
                        source={{ uri: item.cover }}
                      />
                      <View
                        style={{
                          marginLeft: 5,
                          justifyContent: "space-around",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#616A7B",
                            fontWeight: "600",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{ fontWeight: "bold", fontSize: 11 }}
                        >{`${item.quantity} ลัง`}</Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <>
                  <Image
                    style={{
                      width: 52,
                      height: 52,
                      marginTop: 20,
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                    source={require("../../../assets/box-empty.png")}
                  />
                  <Text style={{ alignSelf: "center", color: "#C2C6CE" }}>
                    ไม่มีของแถมที่ได้รับ
                  </Text>
                </>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={{ marginTop: 30 }}
            onPress={() =>
              navigation.navigate("SuccessDetail", { data: route.params.data })
            }
          >
            <Text style={{ color: "#616A7B", alignSelf: "center" }}>
              ดูรายละเอียดคำสั่งซื้อนี้
            </Text>
          </TouchableOpacity>
          <View style={styled.deliveryButtonContainer}>
            <TouchableOpacity
              style={styled.deliveryButton}
              onPress={() => {
                navigation.navigate("Order");
              }}
            >
              <Text style={styled.deliveryButtonText}>ดูคำสั่งซื้อทั้งหมด</Text>
            </TouchableOpacity>
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
      </ScrollView>
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
    marginTop: 20,
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
    marginHorizontal: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 15,
  },
  shopNameWarp: {
    flexDirection: "row",
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textProduct: { fontSize: 16, color: "#333333" },
  textPrice: { fontSize: 16, color: "#616A7B" },
  textLabelTotal: { fontSize: 16, fontWeight: "bold" },
  textTotal: { fontSize: 20, fontWeight: "bold", color: "#4C95FF" },
  deliveryButton: {
    height: 50,
    backgroundColor: "#4C95FF",
    justifyContent: "center",
    borderRadius: 8,
  },
  deliveryButtonText: {
    color: "#FFF",
    fontSize: 18,
    alignSelf: "center",
  },
  deliveryButtonContainer: {
    marginTop: "5%",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  textDiscountFromProduct: {
    color: "rgba(58, 174, 73, 1)",
    fontSize: 14,
    fontWeight: "bold",
  },
  warpPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textDiscountFromCash: {
    color: "#4C95FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  textTotalDiscount: {
    color: "#616A7B",
    fontSize: 16,
    fontWeight: "bold",
  },
  textDiscount: { fontSize: 14, color: "#6B7995" },
});
