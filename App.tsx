import React from 'react'
import AppLoading from 'expo-app-loading'
import AppNavigator from './src/navigations/AppNavigator'
import { AppState } from './src/models/AppState'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { RootSiblingParent } from 'react-native-root-siblings'
import * as Font from 'expo-font'

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isReady: false,
      isLogin: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      NotoSansThaiBold: require('./assets/font/NotoSansThai-Bold.ttf'),
      NotoSansThaiSemiBold: require('./assets/font/NotoSansThai-SemiBold.ttf'),
      NotoSansThaiMedium: require('./assets/font/NotoSansThai-Medium.ttf'),
      THSarabun: require('./assets/font/THSarabun.ttf'),
    })

    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    } else {
      return (
        <RootSiblingParent>
          <NavigationContainer>
            <NativeBaseProvider>
              <AppNavigator />
            </NativeBaseProvider>
          </NavigationContainer>
        </RootSiblingParent>
      )
    }
  }
}
