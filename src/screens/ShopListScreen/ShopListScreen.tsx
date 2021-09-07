import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { ShopEntity } from '../../entities/ShopEntity'
import { ShopFacade } from '../../facade/Shopfacade'
import _ from 'lodash'
import { ScrollView } from 'react-native-gesture-handler'
import AppLoading from 'expo-app-loading'
import { StackScreenProps } from '@react-navigation/stack'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import Search from '../../components/Search'
import { ShopDataSource } from '../../datasource/ShopDataSource'
import CustomHeader from '../../components/CustomHeader'
import Subheading2 from '../../components/Font/Subheading2'
import Text1 from '../../components/Font/Text1'

type ShopListScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'ShopList'>

const ShopListScreen: React.FC<ShopListScreenRouteProp> = ({ navigation, route }) => {
  const [] = useState(false)
  const [shopData, setShopData] = useState<ShopEntity[]>()

  const searchShop = (keywords: string) => {
    ShopDataSource.getShop(route.params.territory, keywords).then((res) => setShopData(res.data))
  }

  useEffect(() => {
    ShopFacade.getShopListData(route.params.territory).then((res) => setShopData(res))
  }, [])

  return (
    <View style={styles.container}>
      <CustomHeader title={'เลือกร้านค้า'} showBackBtn onPressBack={() => navigation.goBack()} />
      <View style={{ backgroundColor: 'white' }}>
        <Search placeholder="ค้นหาร้านค้า" onChange={(e) => searchShop(e)} />
      </View>
      {route.params != undefined && shopData != undefined && shopData.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ padding: 20, backgroundColor: '#F6F9FF' }}>
              <Subheading2 style={styles.textHeader}>{`ร้านค้าในเขต ${route.params.territory}`}</Subheading2>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={shopData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ paddingTop: 20, paddingLeft: 10 }}
                  key={item.id}
                  onPress={() => {
                    navigation.navigate('Brand', {
                      shop: item,
                      company: route.params.company,
                    })
                  }}
                >
                  <Text1 style={{ paddingLeft: 20 }} key={item.name}>
                    {item.name}
                  </Text1>
                  <View style={styles.line} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      ) : (
        <AppLoading />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  line: {
    marginTop: 20,
    borderBottomColor: '#EBEFF2',
    borderBottomWidth: 2,
    borderRadius: 3,
  },
})

export default ShopListScreen
