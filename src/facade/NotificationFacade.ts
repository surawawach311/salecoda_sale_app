import { Platform } from 'react-native'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import { AppNotificationDataSource } from '../datasource/AppNotificationDataSource'

export default class NotificationFacade {
  private static notification: Notification
  private static getInstance = () => {
    if (!NotificationFacade.notification) NotificationFacade.notification = new Notification()
    return NotificationFacade.notification
  }

  static bindToken = (): Promise<string | undefined> => {
    const fcm_token = NotificationFacade.getInstance()
      .registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          return token
        }
      })
    return fcm_token
  }

  static setOnResponse = (onResponse: Function) => {
    NotificationFacade.getInstance().onResponse = onResponse
  }
}

class Notification {
  onResponse: Function = () => { }

  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    })

    Notifications.addNotificationResponseReceivedListener((response) => {
      // TODO: goto feed
      this.onResponse(response.notification.request.content.data)
    })
  }

  /**
   * Register expo, asking for permission then return expo push token
   * @returns token
   */
  async registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        // TODOL Move to display level
        alert('Failed to get push token for push notification!')
        return ''
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data
      console.log('token', token)
      return token
    } else {
      // TODOL Move to display level
      alert('Must use physical device for Push Notifications')
      return ''
    }
  }
}
