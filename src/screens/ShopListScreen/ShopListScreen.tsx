import { List, ListItem, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ShopEntity } from "../../entities/ShopEntity";
import { ShopFacade } from "../../facade/Shopfacade";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { AppLoading } from "expo";

const ShopListScreen: React.FC = () => {
  const [] = useState(false);
  const [shopData, setShopData] = useState<
    _.Object<_.Dictionary<ShopEntity[]>>
  >();

  useEffect(() => {
    ShopFacade.getShopListData().then((res) => setShopData(res));
  }, []);

  const renderList: () => JSX.Element[] = () => {
    const list: JSX.Element[] = [];
    console.log(shopData);

    if (shopData !== undefined) {
      shopData.forEach((shops, territory) => {
        list.push(
          <>
            <ListItem itemHeader>
              <Text
                style={styles.textHeader}
              >{`ร้านค้าในเขต ${territory}`}</Text>
            </ListItem>
          </>
        );
        shops.map((shop) =>
          list.push(
            <ListItem>
              <Text>{shop.name}</Text>
            </ListItem>
          )
        );
      });
    } else {
      <AppLoading/>
    }
    return list;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <List>{renderList()}</List>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // You should only need this
    height: "100%", // But these wouldn't hurt.
    width: "100%",
  },
  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ShopListScreen;
