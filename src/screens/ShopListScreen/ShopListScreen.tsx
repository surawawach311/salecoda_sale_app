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

type ShopListScreenRouteProp = StackScreenProps<
  PurchaseStackParamList,
  "ShopList"
>;

const ShopListScreen: React.FC<ShopListScreenRouteProp> = ({
  navigation,
  route,
}) => {
  const [] = useState(false);
  const [shopData, setShopData] = useState<
    _.Object<_.Dictionary<ShopEntity[]>>
  >();

  useEffect(() => {
    ShopFacade.getShopListData().then((res) => setShopData(res));
  }, []);

  const renderList: () => JSX.Element[] = () => {
    const list: JSX.Element[] = [];
    if (shopData !== undefined) {
      shopData.forEach((shops, territory) => {
        list.push(
          <>
            <ListItem itemHeader>
              <Text
                key={territory}
                style={styles.textHeader}
              >{`ร้านค้าในเขต ${territory}`}</Text>
            </ListItem>
          </>
        );
        shops.map((shop: ShopEntity) =>
          list.push(
            <ListItem
              key={shop.name}
              onPress={() => {
                navigation.navigate("Shop", { shop: shop });
              }}
            >
              <Text key={shop.name}>{shop.name}</Text>
            </ListItem>
          )
        );
      });
    } else {
      <AppLoading />;
    }
    return list;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List key={"1"}>{renderList()}</List>
      </ScrollView>
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
