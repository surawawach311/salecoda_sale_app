import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PurchaseNavigator from './PurchaseNavigator'
import HomeNavigator from './HomeNavigator'
import { UserDataProvider } from '../provider/UserDataProvider'
import { CartProvider } from '../context/cartStore'

const MainNavigator: React.FC = () => {
  const Stack = createStackNavigator()
  return (
    <UserDataProvider>
      <CartProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Purchase" component={PurchaseNavigator} />
      </Stack.Navigator>
      </CartProvider>
    </UserDataProvider>
  )
}

export default MainNavigator
