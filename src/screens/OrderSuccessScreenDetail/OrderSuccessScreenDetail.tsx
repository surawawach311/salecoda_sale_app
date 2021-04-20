import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Dash from "react-native-dash";
import { ScrollView } from "react-native-gesture-handler";
import ProductCartCard from "../../components/ProductCartCard";
import { ShopDataSource } from "../../datasource/ShopDataSource";
import { PaymentMethod } from "../../definitions/PaymentMethod";
import { ShopEntity } from "../../entities/ShopEntity";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import { currencyFormat } from "../../utilities/CurrencyFormat";
import { ThaiDateFormat, ThaiTimeFormat } from "../../utilities/ThaiDateFormat";
import { Accordion, Icon } from "native-base";
import AccrodingPrice from "../../components/AccrodingPrice";
import { AccrodionPriceModel } from "../../models/AccrodionPriceModel";
import BadgeStatus from "../../components/BadgeStatus";
import TagStatus from "../../components/TagStatus";
import { UserDataContext } from "../../provider/UserDataProvider";
import { SHIPPING_METHOD_MAPPING } from "../../definitions/ShippingMethod";

type OrderSuccessScreenDetailRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "SuccessDetail"
>;

const OrderSuccessScreenDetail: React.FC<OrderSuccessScreenDetailRouteProp> = ({
  navigation,
  route,
}) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [shop, setShop] = useState<ShopEntity>();
  const [discoutPromo, setDiscoutPromo] = useState<AccrodionPriceModel[]>([]);
  const [specialRequest, setSpecialRequest] = useState<AccrodionPriceModel[]>(
    []
  );
  const userDataStore = useContext(UserDataContext);
  const { userData } = userDataStore;

  useEffect(() => {
    getShopById(route.params.data.buyer_id);
  }, []);

  const getShopById = (shopId: string) => {
    ShopDataSource.getShopById(shopId).then((res: ShopEntity) => {
      setShop(res);
    });
  };

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
    initialData();
  }, []);

  const initialData = () => {
    let orderItems = route.params.data.items;
    let recevied_item_discounts = route.params.data.discount_memo
      .filter((item) => item.item_id != null && item.item_id != "")
      .map((i) => {
        let refItem = orderItems.find((x) => x.id === i.item_id);
        return {
          name: refItem?.title,
          price: i.price,
          quantity: i.quantity,
          sale_unit: refItem?.unit,
        };
      });
    let recevied_request_item_discounts = route.params.data.special_request_discounts.map(
      (i) => {
        let refItem = orderItems.find((x) => x.id === i.item_id);
        return {
          name: refItem?.title,
          price: i.price,
          quantity: i.quantity,
          sale_unit: refItem?.unit,
        };
      }
    );
    let promo = formatAccrodion(recevied_item_discounts);
    let request = formatAccrodion(recevied_request_item_discounts);
    setDiscoutPromo(promo);
    setSpecialRequest(request);
  };

  // TODO: don't use any type
  const formatAccrodion = (data: any[]): AccrodionPriceModel[] => {
    let arrayOutput: any[] = [];
    data.map((item: any) => {
      let unit = item.sale_unit ? item.sale_unit : item.unit;
      arrayOutput.push({
        item: `${item.name} (${item.price}฿ x ${item.quantity} ${unit})`,
        price: item.price,
        quantity: item.quantity,
      });
    });
    return arrayOutput;
  };

  const totalQuantityUnit = (): string => {
    return userData.company === "icpf" ? "ตัน" : "ชุด";
  };

  const cancelByWording = (status: string): string => {
    if (status == "sale_executive_rejected") {
      return "(ผู้จัดการ)";
    } else if (status == "customer_canceled") {
      return "(ลูกค้า)";
    } else {
      return "(บริษัท)";
    }
  };

  const {
    order_no,
    created,
    payment_method,
    items,
    before_discount,
    discount_memo,
    special_request_discounts,
    total_discount,
    total_price,
    premium_memo,
    status,
    subsidize,
    shipping_method,
    shipping_address,
    special_request_remark,
    remark,
    updated,
  } = route.params.data;
  return (
    <View style={styled.container}>
      <ScrollView>
        {status == "sale_executive_rejected" ||
        status == "customer_canceled" ||
        status == "company_canceled" ? (
          <View style={{ paddingHorizontal: 20 }}>
            <Image
              style={{ alignSelf: "center", width: 120, height: 120 }}
              source={require("../../../assets/reject-order.png")}
            />
            <View
              style={{
                backgroundColor: "#FFFFFF",
                padding: 15,
                borderRadius: 12,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold", paddingBottom: 12 }}
              >
                รายละเอียดการยกเลิก
              </Text>
              <Text
                style={{ fontSize: 14, color: "#6B7995", paddingBottom: 4 }}
              >
                หมายเลขคำสั่งซื้อ : {order_no}
              </Text>
              <Text
                style={{ fontSize: 14, color: "#6B7995", paddingBottom: 12 }}
              >
                ขอยกเลิก :{" "}
                {`${ThaiDateFormat(updated)} ${ThaiTimeFormat(updated)}`}
              </Text>
              <View style={{ borderWidth: 1, borderColor: "#EBEFF2" }} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  paddingVertical: 12,
                }}
              >
                เหตุผลที่ยกเลิก
                {cancelByWording(status)}
              </Text>
              <Text
                style={{ fontSize: 14, color: "#6B7995", paddingBottom: 12 }}
              >
                {remark}
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styled.upperContainer}>
          <View style={styled.innerUpperContainer}>
            <View style={styled.orderNumberContainer}>
              <Image
                style={styled.iconInvoice}
                source={require("../../../assets/invoice.png")}
              />
              <Text style={styled.textOrderNumber}>{order_no}</Text>
            </View>
            <TagStatus status={status} />
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

            {shop ? (
              <Text style={styled.textBlack}>{shop.name}</Text>
            ) : (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  marginTop={3}
                  width="70%"
                  height={30}
                  borderRadius={4}
                />
              </SkeletonPlaceholder>
            )}
            <Text style={styled.textGrayLabel}>เวลาที่เปิดออเดอร์</Text>
            <Text style={styled.textBlack}>{`${ThaiDateFormat(
              created
            )} ${ThaiTimeFormat(created)}`}</Text>
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
          <View style={styled.footerOfHeader}>
            <View style={styled.borderLeftCircle} />
            <View style={styled.borderRightCircle} />
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
            {SHIPPING_METHOD_MAPPING[shipping_method]}
          </Text>
          <View style={{ marginVertical: 10 }}>
            {shop ? (
              <Text style={styled.textBlack}>
                {shipping_address.line_one + "\n" + shipping_address.line_two}
              </Text>
            ) : (
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  marginTop={3}
                  width="100%"
                  height={30}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  marginTop={3}
                  width="70%"
                  height={30}
                  borderRadius={4}
                />
              </SkeletonPlaceholder>
            )}
          </View>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <View style={{ marginVertical: 10 }}>
            <Text style={styled.textGrayLabel}>หมายเหตุ</Text>
            <Text style={styled.textBlack}>
              {shipping_address.remark ? shipping_address.remark.trim() : "-"}
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
          {route.params.data != undefined
            ? items.map((product) => {
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
          <View style={styled.totalQuantity}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>จำนวนรวม</Text>
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}
            >{`${totalQuantity} ${totalQuantityUnit()}`}</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styled.textGrayLabel}>หมายเหตุการขอส่วนลดพิเศษ</Text>
            <Text style={styled.textBlack}>
              {special_request_remark ? special_request_remark.trim() : "-"}
            </Text>
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
            {payment_method == "cash"
              ? PaymentMethod.cash
              : PaymentMethod.credit}
          </Text>
          <View style={styled.productTextWarp}>
            <Text style={{ fontSize: 14, color: "#6B7995" }}>ราคาก่อนลด</Text>
            <Text style={styled.textPrice}>
              {currencyFormat(before_discount, 2)}
            </Text>
          </View>

          {discount_memo.filter((item) => item.item_id != null).length > 0 ? (
            <AccrodingPrice
              title="ส่วนลดรายการ"
              total={discount_memo
                .filter((item) => item.item_id != "")
                .reduce((sum, item) => sum + item.quantity * item.price, 0)}
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
          {subsidize != 0 ? (
            <View style={styled.productTextWarp}>
              <Text style={{ fontSize: 14, color: "#6B7995" }}>
                ส่วนลดดูแลราคา
              </Text>
              <Text
                style={{ color: "#FF5D5D", fontSize: 16, fontWeight: "bold" }}
              >
                {currencyFormat(subsidize, 2)}
              </Text>
            </View>
          ) : null}
          {discount_memo.length > 0
            ? discount_memo
                .filter((item) => item.item_id == null || item.id == "cash")
                .map((item) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 10,
                        marginTop: 10,
                      }}
                    >
                      <Text style={styled.textDiscount}>ส่วนลดเงินสด</Text>
                      <Text style={styled.textDiscountFromCash}>
                        {currencyFormat(item.price, 2)}
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
              {currencyFormat(total_discount, 2)}
            </Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: "#EBEFF2" }} />
          <View style={styled.totalPrice}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#616A7B" }}
            >
              ราคารวม
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#4C95FF" }}
            >
              {currencyFormat(total_price, 2)}
            </Text>
          </View>
          <Dash
            dashGap={2}
            dashLength={4}
            dashThickness={1}
            style={styled.lineDash}
            dashColor="#C8CDD6"
          />
          <View style={styled.emptyPremiumContainer}>
            <Text style={styled.textProductHeader}>ของแถมที่ได้รับ</Text>
            {premium_memo.length > 0 ? (
              <View style={{ marginTop: 10 }}>
                {premium_memo.map((item) => {
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
                          style={{
                            fontSize: 12,
                            color: "#616A7B",
                          }}
                        >
                          {item.packing_size}
                        </Text>
                        <Text
                          style={{ fontWeight: "bold", fontSize: 11 }}
                        >{`${item.quantity} ${item.unit}`}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View>
                <Image
                  style={styled.imgEmpty}
                  source={require("../../../assets/box-empty.png")}
                />
                <Text style={styled.textPremuimEmpty}>
                  ไม่มีของแถมที่ได้รับ
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styled.footer}>
          <Image
            style={styled.imageFooter}
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
    marginVertical: 10,
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
  borderLeftCircle: {
    backgroundColor: "#E5E5E5",
    borderRadius: 13,
    width: 13,
    padding: 13,
    left: -15,
    top: -13,
  },
  borderRightCircle: {
    backgroundColor: "#E5E5E5",
    borderRadius: 13,
    width: 13,
    padding: 13,
    right: -15,
    top: -13,
  },
  footer: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginBottom: 40,
    justifyContent: "center",
  },
  emptyPremiumContainer: { marginTop: 10, marginBottom: 30 },
  imgEmpty: {
    width: 52,
    height: 52,
    resizeMode: "contain",
    alignSelf: "center",
  },
  textPremuimEmpty: { alignSelf: "center", color: "#C2C6CE" },
  imageFooter: {
    height: 11,
    width: "100%",
    resizeMode: "cover",
  },
  totalQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  footerOfHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  beforeDiscountWarper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  totalDiscountWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textDiscountFromProduct: {
    color: "rgba(58, 174, 73, 1)",
    fontSize: 14,
    fontWeight: "bold",
  },
  productTextWarp: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLabelTotal: { fontSize: 16, fontWeight: "bold" },
  textDiscount: { fontSize: 14, color: "#6B7995" },
  textDiscountFromCash: {
    color: "#FF8329",
    fontSize: 16,
    fontWeight: "bold",
  },
  textPrice: { fontSize: 16, color: "#616A7B" },
  textTotal: { fontSize: 20, fontWeight: "bold", color: "#4C95FF" },
});
