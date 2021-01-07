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
  const [shopData, setShopData] = useState<ShopEntity[]>();

  useEffect(() => {
    ShopFacade.getShopListData().then((res) => setShopData(res));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <List>
          <ListItem itemHeader>
            <Text
              key={"A04"}
              style={styles.textHeader}
            >{`ร้านค้าในเขต A04`}</Text>
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
