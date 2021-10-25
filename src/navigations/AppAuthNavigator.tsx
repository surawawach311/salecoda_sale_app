import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InputTelNumberScreen from '../screens/InputTelNumberScreen/InputTelNumberScreen'
import InputOtp from '../screens/InputOtpScreen/InputOtpScreen'
import LoginSuccessScreen from '../screens/LoginSuccessScreen/LoginSuccessScreen'
import AppNavigator from '../navigations/AppNavigator'
import { NewUserEntity, UserEntity } from '../entities/userEntity'
import InternalServerError from '../screens/HttpError/InternalServerError'
import Unauthorized from '../screens/HttpError/Unauthorized'

export type AppAuthParamList = {
  InputTelNumber: undefined
  InputOtp: { telephoneNo: string }
  LoginSuccess: { userProfile: NewUserEntity }
  InternalServerError: undefined
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
      <Stack.Screen name="Unauthorize" component={Unauthorized} />
      <Stack.Screen name="InternalServerError" component={InternalServerError} />
    </Stack.Navigator>
  )
}

export default AppAuthNavigator
