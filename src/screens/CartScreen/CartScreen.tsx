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
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    CartDataSource.getCartByShop(route.params.shop.id).then((res) =>
      setItems(res["items"])
    );
  };

  const increaseProduct = async (itemId: string, quantity: number) => {
  await  CartDataSource.addToCartByShopId(
      route.params.shop.id,
      itemId,
      quantity + 1
    ).then((res) => setItems(res["items"]));
  };

  const decreaseProduct = async (itemId: string, quantity: number) => {
   await CartDataSource.addToCartByShopId(
      route.params.shop.id,
      itemId,
      quantity - 1
    ).then((res) => setItems(res["items"]));
  };
  const adjustProduct = async (itemId: string, quantity: number) => {
    const regexp = /^[0-9\b]+$/;
    if (quantity.toString() === "" || regexp.test(quantity.toString())) {
      CartDataSource.addToCartByShopId(
        route.params.shop.id,
        itemId,
        quantity
      ).then((res) => setItems(res["items"]));
    } else {
      alert("Number Only");
    }
  };

  const removeItem = async (itemId: string) => {
    CartDataSource.removeItem(route.params.shop.id, itemId).then((res) =>
      setItems(res["items"])
    );
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
      <View style={styled.productContainer}>
        <Text style={{ marginBottom: 5 }}>สินค้า</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styled.innerProductContainer}>
            {items.map((item: CartProductEntity, index: number) => {
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
                      setQuantity((items[index].quantity = e));
                    }}
                    onBlur={() => adjustProduct(item.id, quantity)}
                  />
                </ProductCartCard>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CartScreen;

const styled = StyleSheet.create({
  container: { flex: 1 },
  warpChangeShop: {
    padding: 10,
    backgroundColor: "#F8FAFF",
  },
  productContainer: {
    flex: 2,
    backgroundColor: "white",
    padding: 15,
  },
  innerProductContainer: { marginTop: 10 },
  textProduct: { fontSize: 18 },
});
