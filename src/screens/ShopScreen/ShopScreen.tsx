import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, ScrollView } from "react-native";
import { Container, View } from "native-base";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import Search from "../../components/Search";
import ButtonShop from "../../components/ButtonShop";
import ProductCard from "../../components/ProductCard";
import { ShopDataSource } from "../../datasource/ShopDataSource";
import { ProductEntity } from "../../entities/ProductEntity";
import { TouchableOpacity } from "react-native-gesture-handler";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Shop">;

const ShopScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [productList, setProductList] = useState<ProductEntity[]>();
  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = async () => {
    await ShopDataSource.getProduct().then((res) => {
      setProductList(res);
    });
  };

  return (
    <Container>
      <View style={styles.wrapSearch}>
        <Search />
      </View>
      <View style={styles.warpShopHeader}>
        <Image
          style={styles.bgImage}
          source={require("../../../assets/bgShop.png")}
        />
        <View style={styles.shopInfo}>
          <Text style={styles.textShopName}>{route.params.shop.name}</Text>
          <Image
            style={styles.skyRocket}
            source={require("../../../assets/skyrocket.png")}
          />
          <View style={styles.shopPoint}>
            <Image
              style={styles.coin}
              source={require("../../../assets/coin.png")}
            />

            <Text style={styles.textPoint}>0 คะแนน</Text>
          </View>
        </View>
      </View>
      <View style={styles.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate("ShopList")} />
      </View>
      <View style={styles.wrapProduct}>
        <ScrollView
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        >
          {productList?.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("ProductInfo", {
                  product: item,
                  shop: route.params.shop,
                })
              }
            >
              <ProductCard
                thName={item.title}
                enName={item.common_title}
                productInfo={item.packing_size}
                price={item.price_per_volume}
                imagePath={item.image}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapSearch: {
    marginTop: 8,
    flex: 0.2,
  },
  warpShopHeader: {
    flex: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  shopInfo: { padding: 20 },
  wrapProduct: {
    flex: 1,
    marginTop: "10%",
    flexDirection: "row",
  },
  warpChangeShop: {
    padding: 25,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "33%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  textShopName: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  shopPoint: {
    flexDirection: "row",
    alignItems: "center",
  },
  skyRocket: {
    width: 130,
    height: 50,
    resizeMode: "contain",
    marginTop: 15,
  },
  coin: {
    width: 30,
    height: 30,
  },
  textPoint: {
    color: "#FFFFFF",
    fontSize: 24,
    marginLeft: 10,
  },
});

export default ShopScreen;
