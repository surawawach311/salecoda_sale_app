import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonShop from "../../components/ButtonShop";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import ProductCartCard from "../../components/ProductCartCard";
import InputNumber from "../../components/InputNumber";
import { CartDataSource } from "../../datasource/CartDataSource";
import { ScrollView } from "react-native-gesture-handler";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Cart">;

const CartScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    CartDataSource.getCartByShop(route.params.shop.id).then((res) =>
      setItems(res["items"])
    );
  };

  return (
    <View style={styled.container}>
      <View style={styled.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate("ShopList")} />
      </View>

      <View style={styled.productContainer}>
        <Text>สินค้า</Text>
        <View style={styled.innerProductContainer}>
          {items.map((item: any) => {
            return (
              <ProductCartCard
                title={item.title}
                image={encodeURI(item.image)}
                pricePerUnit={item.price}
                quantity={item.quantity}
                priceTotal={item.total_price}
              >
                <InputNumber value={item.quantity.toString()} />
              </ProductCartCard>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styled = StyleSheet.create({
  container: { flex: 1 },
  warpChangeShop: {
    padding: 15,
    backgroundColor: "#F8FAFF",
    width: "100%",
    height: "100%",
    flex: 0.08,
  },
  productContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
  innerProductContainer: { marginTop: 30 },
  textProduct: { fontSize: 18 },
});
