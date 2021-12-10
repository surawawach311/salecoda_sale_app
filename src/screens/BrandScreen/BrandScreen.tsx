import React, { useContext, useEffect, useState } from 'react'
import { PurchaseStackParamList } from '../../navigations/PurchaseNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { View, Text, Image, StyleSheet } from 'react-native'
import { ShopDataSource } from '../../datasource/ShopDataSource'
import { BrandEntity } from '../../entities/ShopEntity'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CustomHeader from '../../components/CustomHeader'
import { ResponseEntity } from '../../entities/ResponseEntity'
import { UserDataContext, UserDataProvider } from '../../provider/UserDataProvider'

type BrandScreenRouteProp = StackScreenProps<PurchaseStackParamList, 'Brand'>

const BrandScreen: React.FC<BrandScreenRouteProp> = ({ route, navigation }) => {
  const [brandList, setBrandList] = useState<BrandEntity[]>([])
  const userProvider = useContext(UserDataContext)
  const { selectBrand } = userProvider
  useEffect(() => {
    ShopDataSource.getBrandByShopId(route.params.shop.id, route.params.company).then(
      (res: ResponseEntity<BrandEntity[]>) => {
        if (res.responseData.length <= 1) {
          navigation.navigate('ProductList', {
            shop: route.params.shop,
            company: route.params.company,
            productBrand: undefined,
          })
        } else {
          setBrandList(res.responseData)
        }
      },
    )
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFF' }}>
      <CustomHeader title={'เลือกแบรนด์'} showBackBtn onPressBack={() => navigation.goBack()} />
      {brandList.map((item) => {
        return (
          <TouchableOpacity
            key={item.product_brand}
            style={styled.brandCard}
            onPress={() => {
              selectBrand(item.product_brand)
              navigation.navigate('ProductList', {
                shop: route.params.shop,
                company: route.params.company,
                productBrand: item.product_brand,
              })
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ width: 75, height: 50, resizeMode: 'contain' }}
                source={{
                  uri: item.image,
                }}
              />
              <Text style={{ marginLeft: 29, fontSize: 16 }}>{item.product_brand_name}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styled = StyleSheet.create({
  brandCard: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    padding: 25,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

export default BrandScreen
