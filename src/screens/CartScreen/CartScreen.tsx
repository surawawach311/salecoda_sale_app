import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import ButtonShop from "../../components/ButtonShop";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import ProductCartCard from "../../components/ProductCartCard";
import InputNumber from "../../components/InputNumber";
import { CartDataSource } from "../../datasource/CartDataSource";
import { ScrollView } from "react-native-gesture-handler";
import { CartProductEntity } from "../../entities/CartProductEntity";
import { Platform } from "react-native";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Cart">;

const CartScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [items, setItems] = useState<CartProductEntity[]>([]);
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
      // setItems(res["items"])
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

      // setItems(res["items"]));
    } else {
      alert("Number Only");
    }
  };

  const removeItem = async (itemId: string) => {
    CartDataSource.removeItem(route.params.shop.id, itemId).then((res) =>
      setCart(res)
    );

    // setItems(res["items"])  );
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
                    <Text style={styled.textBodyPayment}>
                      {method.name} (รับส่วนลดเพิ่ม {method.discount_rate}%)
                    </Text>
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
            <View style={styled.lineDash} />
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
          </ScrollView>
        ) : (
          <></>
        )}
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
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#C8CDD6",
  },
  totalPriceContainer: {
    padding: 15,
    backgroundColor: "white",
  },
  warpPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBeforeTotal: { fontSize: 16, color: "#6B7995" },
  textLabelTotalPrice: { fontSize: 16, color: "#314364", fontWeight: "bold" },
  textTotalPrice: { fontSize: 20, color: "#4C95FF", fontWeight: "bold" },
});
