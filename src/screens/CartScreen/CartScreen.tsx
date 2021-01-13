import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import ButtonShop from "../../components/ButtonShop";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import ProductCartCard from "../../components/ProductCartCard";
import InputNumber from "../../components/InputNumber";
import { CartDataSource } from "../../datasource/CartDataSource";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { CartProductEntity } from "../../entities/CartProductEntity";
import { ModalDeliveryMethod } from "../../components/ModalDeliveryMethod";
import { values } from "lodash";
import { ShopEntity } from "../../entities/ShopEntity";
import Dash from "react-native-dash";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Cart">;

const CartScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [modalDelivery, setModalDelivery] = useState(false);
  const [remark, setRemark] = useState("");
  const [deliveryPoint, setDeliveryPoint] = useState<ShopEntity>();
  const [] = useState<CartProductEntity[]>([]);
  const [cart, setCart] = useState<any>();
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    getCart();
  }, []);

  const currencyFormat = (num: number) => {
    return "฿" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const getCart = async () => {
    CartDataSource.getCartByShop(route.params.shop.id).then((res) =>
      setCart(res)
    );
  };

  const increaseProduct = async (itemId: string, quantity: number) => {
    await CartDataSource.addToCartByShopId(
      route.params.shop.id,
      itemId,
      quantity + 1
    ).then((res) => setCart(res));
  };

  const decreaseProduct = async (itemId: string, quantity: number) => {
    await CartDataSource.addToCartByShopId(
      route.params.shop.id,
      itemId,
      quantity - 1
    ).then((res) => setCart(res));
  };
  const adjustProduct = async (itemId: string, quantity: number) => {
    const regexp = /^[0-9\b]+$/;
    if (quantity.toString() === "" || regexp.test(quantity.toString())) {
      CartDataSource.addToCartByShopId(
        route.params.shop.id,
        itemId,
        quantity
      ).then((res) => setCart(res));
    } else {
      alert("Number Only");
    }
  };

  const removeItem = async (itemId: string) => {
    CartDataSource.removeItem(route.params.shop.id, itemId).then((res) =>
      setCart(res)
    );
  };

  const handleCloseModal = () => {
    setModalDelivery(false);
  };

  const handleOkDeliveryModal = (value: string, shop: ShopEntity) => {
    setDeliveryPoint(shop);
    setRemark(value);
    setModalDelivery(false);
  };

  return (
    <KeyboardAvoidingView
      style={styled.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <View style={styled.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate("ShopList")} />
      </View>
      <View style={styled.borderContainer}>
        {cart !== undefined ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styled.productContainer}>
              <Text style={styled.textProduct}>สินค้า</Text>
              {cart.items.map((item: CartProductEntity, index: number) => {
                return (
                  <ProductCartCard
                    key={item.title}
                    title={item.title}
                    pricePerVolume={item.price_per_volume}
                    volumeUnit={item.volume_unit}
                    packingSize={item.packing_size}
                    image={encodeURI(item.image)}
                    pricePerUnit={item.price}
                    saleUnit={item.sale_unit}
                    quantity={item.quantity}
                    priceTotal={item.total_price}
                    onDelete={() => removeItem(item.id)}
                  >
                    <InputNumber
                      key={item.title}
                      value={item.quantity.toString()}
                      onPlus={() => increaseProduct(item.id, item.quantity)}
                      onMinus={() => decreaseProduct(item.id, item.quantity)}
                      onChangeText={(e: any) => {
                        setQuantity((cart.items[index].quantity = e));
                      }}
                      onBlur={() => adjustProduct(item.id, quantity)}
                    />
                  </ProductCartCard>
                );
              })}
            </View>
            <View style={styled.paymentContainer}>
              <Text style={styled.textHeaderPayment}>วิธีชำระเงิน</Text>
              <View style={styled.paymentMethod}>
                {cart.available_payments.map((method: any) => {
                  return method.name == "เงินสด" ? (
                    <View
                      key={method.name}
                      style={styled.methodChoiceContainer}
                    >
                      <View style={styled.iconPin} />
                      <Text style={styled.textBodyPayment}>
                        {method.name} (รับส่วนลดเพิ่ม {method.discount_rate}%)
                      </Text>
                    </View>
                  ) : method.remain_credit ? (
                    <Text style={styled.textBodyPayment}>
                      {method.name} (คงเหลือ {method.remain_credit})
                    </Text>
                  ) : null;
                })}
              </View>
            </View>
            <View style={styled.totalPriceContainer}>
              <Text style={styled.textHeaderPayment}>ส่วนลดที่เหลือ</Text>
              <Text>ไม่มีวงเงินเคลม</Text>
            </View>
            <Dash
              dashGap={2}
              dashLength={4}
              dashThickness={4}
              style={{ width: "100%", height: 1 }}
              dashColor="#C8CDD6"
            />
            <View style={styled.totalPriceContainer}>
              <View style={styled.warpPrice}>
                <Text style={styled.textBeforeTotal}>ราคาก่อนลด</Text>
                <Text style={styled.textBeforeTotal}>
                  {currencyFormat(cart.before_discount)}
                </Text>
              </View>
              <View style={styled.warpPrice}>
                <Text style={styled.textBeforeTotal}>ส่วนลดรวม</Text>
                <Text style={styled.textBeforeTotal}>
                  {currencyFormat(cart.total_discount)}
                </Text>
              </View>
              <View style={styled.warpPrice}>
                <Text style={styled.textLabelTotalPrice}>ราคารวม</Text>
                <Text style={styled.textTotalPrice}>
                  {currencyFormat(cart.total_price)}
                </Text>
              </View>
            </View>
            <View style={styled.warpDelivery}>
              <View style={styled.headerDeliveryMethodtContainer}>
                <Text style={styled.textHeaderPayment}>ตัวเลือกการจัดส่ง</Text>
                {!deliveryPoint ? null : (
                  <TouchableOpacity
                    onPress={() => setModalDelivery(!modalDelivery)}
                  >
                    <Text style={styled.textChageDeliveryMethod}>เปลี่ยน</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styled.line} />
              {!deliveryPoint ? (
                <TouchableOpacity
                  style={styled.buttonDelivery}
                  onPress={() => {
                    setModalDelivery(!modalDelivery);
                  }}
                >
                  <Image
                    style={styled.iconDelivery}
                    source={require("../../../assets/delivery.png")}
                  />
                  <Text style={styled.textButtonDelivery}> เลือกการจัดส่ง</Text>
                </TouchableOpacity>
              ) : (
                <View style={styled.deliveryPointContainer}>
                  <Image
                    style={styled.iconLocation}
                    source={require("../../../assets/location.png")}
                  />
                  <View style={styled.deliveryMethodtContainer}>
                    <Text style={styled.textDeliveryMethod}>จัดส่งที่ร้าน</Text>
                    <Text style={styled.textDeliveryPoint}>
                      <Text style={styled.deliveryTextShopName}>
                        {`${deliveryPoint.name} \n`}
                      </Text>
                      <Text>{`${deliveryPoint?.address} ตำบล${deliveryPoint.sub_district} \n`}</Text>
                      <Text>{`อำเภอ${deliveryPoint.district} ${deliveryPoint.province} ${deliveryPoint.post_code}`}</Text>
                    </Text>
                    {!remark ? null : (
                      <Text style={styled.textRemark}>หมายเหตุ: {remark}</Text>
                    )}
                  </View>
                </View>
              )}
            </View>
            <ModalDeliveryMethod
              visible={modalDelivery}
              onClose={handleCloseModal}
              onOk={handleOkDeliveryModal}
              shop={route.params.shop}
            />
          </ScrollView>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styled.confirmOrderButton}
          onPress={() => {
            setModalDelivery(!modalDelivery);
          }}
        >
          <View style={styled.iconCartWarp}>
            <Image
              style={styled.iconLocation}
              source={require("../../../assets/order-cart.png")}
            />
          </View>
          <Text style={styled.textconfirmOrderButton}>ยืนยันคำสั่งซื้อ</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CartScreen;

const styled = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFF" },
  warpChangeShop: {
    padding: 10,
  },
  warpDelivery: { padding: 10, marginTop: 9, backgroundColor: "#FFFFFF" },
  buttonDelivery: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    padding: 10,
    marginTop: 20,
    margin: 10,
    alignItems: "center",
  },
  iconDelivery: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  iconLocation: { width: 20, height: 20, resizeMode: "contain" },
  textButtonDelivery: { color: "#4C95FF", fontSize: 14, fontWeight: "bold" },
  borderContainer: {
    flex: 2,
    backgroundColor: "#F8FAFF",
  },
  productContainer: {
    backgroundColor: "white",
    padding: 15,
  },
  innerProductContainer: { marginTop: 10 },
  textProduct: { fontSize: 18, marginBottom: 5 },
  paymentContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "white",
  },
  paymentMethod: {
    marginTop: 10,
    borderBottomColor: "#EBEFF2",
    borderBottomWidth: 2,
    borderTopColor: "#EBEFF2",
    borderTopWidth: 2,
    borderRadius: 3,
    padding: 20,
  },
  textHeaderPayment: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textBodyPayment: {
    fontSize: 16,
    color: "#616A7B",
  },
  lineDash: {
    borderStyle: "dashed",
    borderWidth: 5,
    borderRadius: 5,
    borderColor: "#C8CDD6",
    borderTopWidth: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  line: {
    marginTop: 10,
    borderBottomColor: "#EBEFF2",
    borderBottomWidth: 2,
    borderRadius: 3,
  },
  totalPriceContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  warpPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textBeforeTotal: { fontSize: 16, color: "#6B7995" },
  textLabelTotalPrice: { fontSize: 16, color: "#314364", fontWeight: "bold" },
  textTotalPrice: { fontSize: 20, color: "#4C95FF", fontWeight: "bold" },
  deliveryPointContainer: { margin: 20, flexDirection: "row" },
  deliveryTextShopName: { fontWeight: "bold" },
  textChageDeliveryMethod: {
    color: "#4C95FF",
    fontWeight: "bold",
    fontSize: 14,
  },
  textDeliveryPoint: {
    color: "#616A7B",
    fontSize: 16,
  },
  textRemark: {
    color: "#616A7B",
    fontSize: 16,
    marginTop: 10,
  },
  deliveryMethodtContainer: { marginLeft: 10 },
  textDeliveryMethod: {
    color: "#616A7B",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerDeliveryMethodtContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconPin: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#4C95FF",
    width: 20,
    height: 20,
    marginRight: 5,
  },
  methodChoiceContainer: {
    flexDirection: "row",
  },
  confirmOrderButton: {
    flexDirection: "row",
    borderRadius: 6,
    backgroundColor: "#4C95FF",
    padding: 10,
    margin: 20,
    alignItems: "center",
  },
  iconCartWarp: {
    marginRight: 100,
    marginLeft: 10,
  },
  textconfirmOrderButton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
