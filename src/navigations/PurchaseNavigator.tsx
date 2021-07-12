import React, { useContext } from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import ShopListScreen from '../screens/ShopListScreen/ShopListScreen'
import ShopScreen from '../screens/ShopScreen/ShopScreen'
import { ShopEntity } from '../entities/ShopEntity'
import { ProductEntity } from '../entities/ProductEntity'
import ProductInfoScreen from '../screens/ProductInfoScreen/ProductInfoScreen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CartScreen from '../screens/CartScreen/CartScreen'
import OrderSuccessScreen from '../screens/OrderSuccessScreen/OrderSuccessScreen'
import { OrderEntity } from '../entities/OrderEntity'
import OrderSuccessDetail from '../screens/OrderSuccessScreenDetail/OrderSuccessScreenDetail'
import { ThaiDateFormat } from '../utilities/ThaiDateFormat'
import { CartEntity } from '../entities/CartEntity'
import SpecialRequestScreen from '../screens/SpecialRequestScreen/SpecialRequestScreen'
import BrandScreen from '../screens/BrandScreen/BrandScreen'
import { CartContext, CartProvider } from '../context/cartStore'
import MiniCart from '../components/MiniCart'
import { Types } from '../context/cartReducer'

export type PurchaseStackParamList = {
  ShopList: { territory: string; company: string }
  Brand: { shop: ShopEntity; company: string }
  Shop: { shop: ShopEntity; company: string; productBrand?: string }
  ProductInfo: {
    product: ProductEntity
    shop: ShopEntity
    productBrand?: string
    company: string
  }
  Cart: { shop: ShopEntity; productBrand?: string; company: string }
  OrderSuccess: { data: OrderEntity; cart?: CartEntity }
  SuccessDetail: { data: OrderEntity }
  SpecialRequest: {
    cart: CartEntity
    shop: ShopEntity
    item: { item: string; price: number }[]
    productBrand?: string
    company: string
  }
}

const PurchaseNavigator: React.FC = () => {
  const { state } = useContext(CartContext)
  const PurchaseStack = createStackNavigator<PurchaseStackParamList>()

  return (
    <CartProvider>
      <PurchaseStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PurchaseStack.Screen name="ShopList" component={ShopListScreen} />
        <PurchaseStack.Screen name="Shop" component={ShopScreen} />
        <PurchaseStack.Screen name="SpecialRequest" component={SpecialRequestScreen} />
        <PurchaseStack.Screen name="Brand" component={BrandScreen} />
      </PurchaseStack.Navigator>
    </CartProvider>
  )
}

const styled = StyleSheet.create({
  cart: { width: 22, height: 22, marginRight: 20, resizeMode: 'contain' },
})

export default PurchaseNavigator
