import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { accountStore } from '../stores/AccountStore'
import AppAuthNavigator from './AppAuthNavigator'
import MainNavigator from './MainNavigator'

export default function App() {
  const Stack = createStackNavigator()
  React.useEffect(() => {
    accountStore.load()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="Auth" component={AppAuthNavigator} />
    </Stack.Navigator>
  )
}
