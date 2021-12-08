import React, { useContext, useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { ApiShopEntity, ShopEntity } from '../../entities/ShopEntity'
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
import { ResponseEntity } from '../../entities/ResponseEntity'
import { UserLocalStorageService } from '../../services/UserLocalStorageService'
import { UserDataContext } from '../../provider/UserDataProvider'

type ShopListScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'ShopList'>

const ShopListScreen: React.FC<ShopListScreenRouteProp> = ({ navigation, route }) => {
  const [shopData, setShopData] = useState<ShopEntity[]>()
  const userDataStore = useContext(UserDataContext)
  const { userData, selectShop } = userDataStore

  const searchShop = (keywords: string) => {
    ShopDataSource.getShop(userData.territory, keywords).then((res: ResponseEntity<ApiShopEntity>) =>
      setShopData(res.responseData.items),
    )
  }

  useEffect(() => {
    ShopDataSource.getShop(userData.territory).then((res) => {
      setShopData(res.responseData.items)
    })
  }, [])

  return (
    <View style={styles.container}>
      <CustomHeader title={'เลือกร้านค้า'} showBackBtn onPressBack={() => navigation.goBack()} />
      <View style={{ backgroundColor: 'white' }}>
        <Search placeholder="ค้นหาร้านค้า..." onChange={(e) => searchShop(e)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View>
          <FlatList
            ListHeaderComponent={
              <View style={{ padding: 20, backgroundColor: '#F6F9FF' }}>
                <Subheading2>{`ร้านค้าในเขต ${userData.territory}`}</Subheading2>
              </View>
            }
            showsVerticalScrollIndicator={false}
            data={shopData}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ paddingTop: 20, paddingLeft: 10 }}
                key={item.id}
                onPress={() => {
                  selectShop(item.shop_no)
                  navigation.navigate('Brand', {
                    shop: item,
                    company: userData.company,
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
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  padding: 100,
                }}
              >
                <Image style={styles.emptyImage} source={require('../../../assets/empty-state/shop.png')} />
                <Text1 style={styles.emptyText}>ไม่พบร้านที่คุณต้องการ</Text1>
              </View>
            }
          />
        </View>
      </ScrollView>
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
  emptyImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  emptyText: {
    color: '#C2C6CE',
  },
})

export default ShopListScreen
