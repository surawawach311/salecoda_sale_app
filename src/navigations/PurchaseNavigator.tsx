import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import ShopListScreen from '../screens/ShopListScreen/ShopListScreen'
import ProductList from '../screens/ProductListScreen/ProductListScreen'
import { ShopEntity } from '../entities/ShopEntity'
import { ProductEntity } from '../entities/ProductEntity'
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CartScreen from '../screens/CartScreen/CartScreen'
import OrderSuccessScreen from '../screens/OrderSuccessScreen/OrderSuccessScreen'
import { OrderEntity } from '../entities/OrderEntity'
import OrderSuccessDetail from '../screens/OrderSuccessScreenDetail/OrderSuccessScreenDetail'
import { ThaiDateFormat } from '../utilities/ThaiDateFormat'
import { CartEntity } from '../entities/CartEntity'
import SpecialRequestScreen from '../screens/SpecialRequestScreen/SpecialRequestScreen'
import BrandScreen from '../screens/BrandScreen/BrandScreen'
import { CartProvider } from '../context/cartStore'

export type PurchaseStackParamList = {
  ShopList: undefined
  Brand: { shop: ShopEntity; company: string }
  ProductList: { shop: ShopEntity; company: string; productBrand?: string }
  ProductDetail: {
    product: ProductEntity
    shop: ShopEntity
    productBrand?: string
    company: string
  }
  Cart: { shop: ShopEntity; productBrand?: string; company: string }
  OrderSuccess: { orderId: string }
  SuccessDetail: { orderId: string }
  SpecialRequest: {
    cart: CartEntity
    shop: ShopEntity
    item: { item: string; price: number }[]
    productBrand?: string
    company: string
  }
}

const PurchaseNavigator: React.FC = () => {
  const PurchaseStack = createStackNavigator<PurchaseStackParamList>()

  return (
    <CartProvider>
      <PurchaseStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PurchaseStack.Screen name="ShopList" component={ShopListScreen} options={{ title: 'เลือกร้านค้า' }} />
        <PurchaseStack.Screen
          name="ProductList"
          component={ProductList}
          options={({ navigation, route }) => ({
            title: 'สั่งสินค้า',
            headerRight: (props) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Cart', {
                    shop: route.params.shop,
                    productBrand: route.params.productBrand,
                    company: route.params.company,
                  })
                }
              >
                <Image style={styled.cart} source={require('../../assets/shopping-cart.png')} />
              </TouchableOpacity>
            ),
            headerLeft: (props) => (
              <TouchableOpacity onPress={() => navigation.navigate('ShopList', { shop: route.params.shop })}>
                <Image style={styled.cart} source={require('../../assets/left.png')} />
              </TouchableOpacity>
            ),
          })}
        />
        <PurchaseStack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ navigation, route }) => ({
            title: '',
            headerRight: (props) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Cart', {
                    shop: route.params.shop,
                    productBrand: route.params.productBrand,
                    company: route.params.company,
                  })
                }
              >
                <Image style={styled.cart} source={require('../../assets/shopping-cart.png')} />
              </TouchableOpacity>
            ),
          })}
        />
        <PurchaseStack.Screen name="Cart" component={CartScreen} options={{ title: 'ตะกร้าสินค้า' }} />
        <PurchaseStack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={{ headerShown: false }} />
        <PurchaseStack.Screen
          name="SuccessDetail"
          component={OrderSuccessDetail}
        />
        <PurchaseStack.Screen
          name="SpecialRequest"
          component={SpecialRequestScreen}
          options={{ title: 'ขอส่วนลดพิเศษ' }}
        />

        <PurchaseStack.Screen name="Brand" component={BrandScreen} options={{ title: 'เลือกแบรนด์' }} />
      </PurchaseStack.Navigator>
    </CartProvider>
  )
}

const styled = StyleSheet.create({
  cart: { width: 22, height: 22, marginRight: 20, resizeMode: 'contain' },
})

export default PurchaseNavigator
