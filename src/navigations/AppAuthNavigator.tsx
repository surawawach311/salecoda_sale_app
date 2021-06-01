import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InputTelNumberScreen from '../screens/InputTelNumberScreen/InputTelNumberScreen'
import InputOtp from '../screens/InputOtpScreen/InputOtpScreen'
import LoginSuccessScreen from '../screens/LoginSuccessScreen/LoginSuccessScreen'
import AppNavigator from '../navigations/AppNavigator'
import { UserEntity } from '../entities/userEntity'

export type AppAuthParamList = {
  InputTelNumber: undefined
  InputOtp: { userProfile: UserEntity }
  LoginSuccess: { userProfile: UserEntity }
  App: undefined
}

const AppAuthNavigator: React.FC = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="InputTelNumber" component={InputTelNumberScreen} />
      <Stack.Screen name="InputOtp" component={InputOtp} />
      <Stack.Screen name="LoginSuccess" component={LoginSuccessScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  )
}

export default AppAuthNavigator
