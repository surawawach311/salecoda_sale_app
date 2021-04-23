import { List, ListItem, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ShopEntity } from "../../entities/ShopEntity";
import { ShopFacade } from "../../facade/Shopfacade";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { AppLoading } from "expo";
import { StackScreenProps } from "@react-navigation/stack";
import { PurchaseStackParamList } from "../../navigations/PurchaseNavigator";
import Search from "../../components/Search";
import { ShopDataSource } from "../../datasource/ShopDataSource";

type ShopListScreenRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "ShopList"
>;

const ShopListScreen: React.FC<ShopListScreenRouteProp> = ({
  navigation,
  route,
}) => {
  const [] = useState(false);
  const [shopData, setShopData] = useState<ShopEntity[]>();

  const searchShop = (keywords: string) => {
    ShopDataSource.getShop(route.params.territory, keywords).then((res) =>
      setShopData(res.data)
    );
  };

  useEffect(() => {
    ShopFacade.getShopListData(route.params.territory).then((res) =>
      setShopData(res)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <Search placeholder="ค้นหาร้านค้า" onChange={(e) => searchShop(e)} />
      </View>
      {route.params != undefined &&
      shopData != undefined &&
      shopData.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <List>
            <ListItem style={{ backgroundColor: "#E5E5E5" }} itemHeader>
              <Text
                style={styles.textHeader}
              >{`ร้านค้าในเขต ${route.params.territory}`}</Text>
            </ListItem>
            {shopData?.map((data) => (
              <ListItem
                key={data.name}
                onPress={() => {
                  navigation.navigate("Brand", {
                    shop: data,
                    company: route.params.company,
                  });
                }}
              >
                <Text key={data.name}>{data.name}</Text>
              </ListItem>
            ))}
          </List>
        </ScrollView>
      ) : (
        <AppLoading />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ShopListScreen;
