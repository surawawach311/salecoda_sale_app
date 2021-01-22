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
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { ModalDeliveryMethod } from "../../components/ModalDeliveryMethod";
import { ShopEntity } from "../../entities/ShopEntity";
import Dash from "react-native-dash";
import {
  CartEntity,
  ItemCart,
  paymentCartEntity,
} from "../../entities/CartEntity";
import { OrderFacade } from "../../facade/OrderFacade";
import { OrderEntity } from "../../entities/OrderEntity";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Cart">;

const CartScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [modalDelivery, setModalDelivery] = useState(false);
  const [remark, setRemark] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShopEntity>();
  const [cart, setCart] = useState<CartEntity>();
  const [quantity, setQuantity] = useState(0);
  const [payment, setPayment] = useState<string | undefined>();

  useEffect(() => {
    getCart();
    if (cart?.selected_payment.id != undefined) {
      setPayment(cart?.selected_payment.id);
    }
  }, []);

  const currencyFormat = (num: number) => {
    return "฿" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const getCart = async () => {
    CartDataSource.getCartByShop(route.params.shop.id).then((res: CartEntity) =>
      setCart(res)
    );
  };

  const increaseProduct = async (itemId: string, quantity: number) => {
    await CartDataSource.addToCartByShopId(
      route.params.shop.id,
      itemId,
      quantity + 1
    ).then((res: CartEntity) => setCart(res));
  };

  const decreaseProduct = async (itemId: string, quantity: number) => {
    await CartDataSource.addToCartByShopId(
      route.params.shop.id,
      itemId,
      quantity - 1
    ).then((res: CartEntity) => setCart(res));
  };
  const adjustProduct = async (itemId: string, quantity: number) => {
    const regexp = /^[0-9\b]+$/;
    if (quantity.toString() === "" || regexp.test(quantity.toString())) {
      CartDataSource.addToCartByShopId(
        route.params.shop.id,
        itemId,
        quantity
      ).then((res: CartEntity) => setCart(res));
    } else {
      alert("Number Only");
    }
  };

  const removeItem = async (itemId: string) => {
    CartDataSource.removeItem(
      route.params.shop.id,
      itemId
    ).then((res: CartEntity) => setCart(res));
  };

  const handleCloseModal = () => {
    setModalDelivery(false);
  };

  const handleOkDeliveryModal = (value: string, shop: ShopEntity) => {
    setShippingAddress(shop);
    setRemark(value);
    setModalDelivery(false);
  };
  const handlePayment = (payment: string) => {
    if (payment == "cash") {
      setPayment("cash");
      CartDataSource.calculate(
        route.params.shop.id,
        payment
      ).then((res: CartEntity) => setCart(res));
    } else {
      setPayment("credit");
      CartDataSource.calculate(
        route.params.shop.id,
        payment
      ).then((res: CartEntity) => setCart(res));
    }
  };

  const confirmOrder = (
    shop: ShopEntity,
    shippingAddress?: any,
    cart?: CartEntity
  ) => {
    if (shippingAddress && cart) {
      OrderFacade.confirmOrder(shop, shippingAddress, cart).then(
        (res: OrderEntity) => {
          navigation.navigate("OrderSuccess", { data: res });
        }
      );
    } else {
      alert("กรุณาเลือกสถานที่จัดส่ง");
    }
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
              {cart.items.map((item: ItemCart, index: number) => {
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
                    mode="cart"
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
                {cart.available_payments.map((method: paymentCartEntity) => {
                  return method.name == "เงินสด" ? (
                    <View
                      key={method.name}
                      style={styled.methodChoiceContainer}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => handlePayment("cash")}
                      >
                        {payment == "cash" ? (
                          <View style={styled.iconPin} />
                        ) : (
                          <View style={styled.iconUnPin} />
                        )}
                      </TouchableWithoutFeedback>
                      <Text style={styled.textBodyPayment}>
                        {method.name} (รับส่วนลดเพิ่ม {method.discount_rate}%)
                      </Text>
                    </View>
                  ) : (
                    <View
                      key={method.name}
                      style={styled.methodChoiceContainer}
                    >
                      <TouchableWithoutFeedback
                        onPress={() => handlePayment("credit")}
                      >
                        {payment == "credit" ? (
                          <View style={styled.iconPin} />
                        ) : (
                          <View style={styled.iconUnPin} />
                        )}
                      </TouchableWithoutFeedback>

                      <Text style={styled.textBodyPayment}>
                        {method.name} (คงเหลือ{" "}
                        {currencyFormat(method.remain_credit)})
                      </Text>
                    </View>
                  );
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
                {!shippingAddress ? null : (
                  <TouchableOpacity
                    onPress={() => setModalDelivery(!modalDelivery)}
                  >
                    <Text style={styled.textChageDeliveryMethod}>เปลี่ยน</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styled.line} />
              {!shippingAddress ? (
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
                        {`${shippingAddress.name} \n`}
                      </Text>
                      <Text>{`${shippingAddress.address} ตำบล${shippingAddress.sub_district} \n`}</Text>
                      <Text>{`อำเภอ${shippingAddress.district} ${shippingAddress.province} ${shippingAddress.post_code}`}</Text>
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
            confirmOrder(route.params.shop, shippingAddress, cart);
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
  iconUnPin: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    width: 20,
    height: 20,
    marginRight: 5,
  },
  methodChoiceContainer: {
    flexDirection: "row",
    marginBottom: 5,
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
