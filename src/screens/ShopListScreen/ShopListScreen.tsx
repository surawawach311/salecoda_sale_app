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

type ShopListScreenRouteProp = StackScreenProps<PurchaseStackParamList, "ShopList">;

const ShopListScreen: React.FC<ShopListScreenRouteProp> = ({
  navigation,
  route,
}) => {
  const [] = useState(false);
  const [shopData, setShopData] = useState<ShopEntity[]>();

  useEffect(() => {
    ShopFacade.getShopListData(route.params.territory).then((res) => setShopData(res));
  }, []);

  return (
    <View style={styles.container}>
      {route.params != undefined ? (
        <ScrollView>
          <List>
            <ListItem itemHeader>
              <Text
                style={styles.textHeader}
              >{`ร้านค้าในเขต ${route.params.territory}`}</Text>
            </ListItem>
            {shopData?.map((data) => (
              <ListItem
                key={data.name}
                onPress={() => {
                  navigation.navigate("Shop", { shop: data });
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
