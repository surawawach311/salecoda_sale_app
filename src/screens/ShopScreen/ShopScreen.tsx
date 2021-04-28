import React, { useEffect, useState } from "react";
import { Text, Image, StyleSheet, FlatList } from "react-native";
import { Container, View } from "native-base";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import Search from "../../components/Search";
import ButtonShop from "../../components/ButtonShop";
import ProductCard from "../../components/ProductCard";
import { ShopDataSource } from "../../datasource/ShopDataSource";
import { ProductEntity } from "../../entities/ProductEntity";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProductDataSource } from "../../datasource/ProductDataSource";

type ShopScreenRouteProp = StackScreenProps<PurchaseStackParamList, "Shop">;

const ShopScreen: React.FC<ShopScreenRouteProp> = ({ navigation, route }) => {
  const [productList, setProductList] = useState<ProductEntity[]>();
  useEffect(() => {
    fecthData();
  }, []);

  const fecthData = async () => {
    if (route.params.productBrand) {
      await ShopDataSource.getProductWithBrand(
        route.params.shop.id,
        route.params.company,
        route.params.productBrand
      ).then((res) => {
        setProductList(res);
      });
    } else {
      await ShopDataSource.getProduct(
        route.params.shop.id,
        route.params.company
      ).then((res) => {
        setProductList(res);
      });
    }
  };

  const searchProduct = (keywords: string) => {
    ProductDataSource.getProductList(
      route.params.shop.id,
      route.params.company,
      keywords
    ).then((res) => {
      setProductList(res);
    });
  };

  return (
    <Container>
      <View style={styles.wrapSearch}>
        <Search
          placeholder="ค้นหาสินค้า"
          onChange={(value) => {
            searchProduct(value);
          }}
        />
      </View>
      <View style={styles.warpShopHeader}>
        <Image
          style={styles.bgImage}
          source={require("../../../assets/bgShop.png")}
        />
        <View style={styles.shopInfo}>
          <Text style={styles.textShopName}>{route.params.shop.name}</Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 60,
              backgroundColor: "white",
              padding: 5,
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
              }}
              source={require("../../../assets/shop-empty.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.warpChangeShop}>
        <ButtonShop onPress={() => navigation.navigate("ShopList")} />
      </View>
      <View style={styles.wrapProduct}>
        <FlatList
          data={productList}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("ProductInfo", {
                  product: item,
                  shop: route.params.shop,
                  productBrand: route.params.productBrand,
                })
              }
            >
              <ProductCard
                thName={item.title}
                enName={item.common_title}
                productInfo={item.packing_size}
                price={item.price_per_volume}
                imagePath={item.image}
                havePromo={item.is_have_promotion}
                unit={item.sale_unit}
                saleUnitPrice={item.price_per_sale_unit}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapSearch: {
    marginTop: 4,
    height: 70,
  },
  warpShopHeader: {
    height: 150,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  shopInfo: {
    flexDirection: "row",
    paddingTop: 40,
    padding: 60,
    paddingLeft: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapProduct: {
    flex: 1,
    marginHorizontal: "6%",
    flexDirection: "row",
    justifyContent: "center",
  },
  warpChangeShop: {
    padding: 25,
    height: 50,
    top: -50,
  },
  bgImage: {
    width: "100%",
    height: 150,
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
