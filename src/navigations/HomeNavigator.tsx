import React, { useContext } from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen'
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import HomeScreen from '../screens/HomeScreen/HomeSrceen'
import PurchaseNavigator from './PurchaseNavigator'
import { UserDataContext } from '../provider/UserDataProvider'
import AppLoading from 'expo-app-loading'

export type HomeStackParamList = {
  Home: undefined
  Purchase: { territory: string }
  Order: undefined
  Profile: undefined
  Notification: undefined
  History: undefined
}
const HomeNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator()
  const userDataStore = useContext(UserDataContext)
  const { config } = userDataStore

  return (
    <>
      {config ? (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  style={styles.icon}
                  source={
                    focused
                      ? require('../../assets/navigator-icon/home-active.png')
                      : require('../../assets/navigator-icon/home-inactive.png')
                  }
                />
              ),
            }}
          />
          {config.mainMenu.btnHistory ? (
            <Tab.Screen
              name="History"
              component={HistoryScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    style={styles.icon}
                    source={
                      focused
                        ? require('../../assets/navigator-icon/history-active.png')
                        : require('../../assets/navigator-icon/history-inactive.png')
                    }
                  />
                ),
              }}
            />
          ) : undefined}
          {config.mainMenu.btnOrder ? (
            <Tab.Screen
              name="Order"
              component={PurchaseNavigator}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    style={styles.icon}
                    source={
                      focused
                        ? require('../../assets/navigator-icon/order-active.png')
                        : require('../../assets/navigator-icon/order-inactive.png')
                    }
                  />
                ),
              }}
            />
          ) : undefined}
          {config.mainMenu.btnOrder ? (
            <Tab.Screen
              name="Notification"
              component={NotificationScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <Image
                    style={styles.icon}
                    source={
                      focused
                        ? require('../../assets/navigator-icon/noti-active.png')
                        : require('../../assets/navigator-icon/noti-inactive.png')
                    }
                  />
                ),
              }}
            />
          ) : undefined}
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  style={styles.icon}
                  source={
                    focused
                      ? require('../../assets/navigator-icon/profile-active.png')
                      : require('../../assets/navigator-icon/profile-inactive.png')
                  }
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AppLoading />
      )}
    </>
  )
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
})
export default HomeNavigator
