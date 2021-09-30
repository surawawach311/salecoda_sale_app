import React from 'react'
import AppLoading from 'expo-app-loading'
import AppNavigator from './src/navigations/AppNavigator'
import { AppState } from './src/models/AppState'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { RootSiblingParent } from 'react-native-root-siblings'
import * as Font from 'expo-font'
import { navigationRef } from './src/navigations/RootNavigation'
import * as Sentry from 'sentry-expo'

Sentry.init({
  dsn: 'https://8cbfbe76b8374f7fb96d4f70abf2f7d3@o987290.ingest.sentry.io/5984244',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
})
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
      THSarabun: require('./assets/font/Sarabun-Regular.ttf'),
    })
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />
    } else {
      return (
        <RootSiblingParent>
          <NavigationContainer ref={navigationRef}>
            <NativeBaseProvider>
              <AppNavigator />
            </NativeBaseProvider>
          </NavigationContainer>
        </RootSiblingParent>
      )
    }
  }
}
