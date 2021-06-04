import { MessageResponseEntity } from '../entities/MessageResponseEntity'
import { httpClient } from '../services/HttpClient'
import { BASE_URL_POPORING } from '../config/config'
import { NotificationListEntity } from '../entities/NotificationEntity'

export class AppNotificationDataSource {
  static bindingToken(notificationToken: String): Promise<MessageResponseEntity> {
    console.log('requesting binding with token', notificationToken)
    return httpClient
      .post(`${BASE_URL_POPORING}/v1/sellcoda/notifications/sale_app/bind`, { token: notificationToken })
      .then((response) => {
        return response.data
      })
      .catch((error) => console.error(`error on AppNotificationDataSource.bind`, error))
  }

  static feeds(): Promise<NotificationListEntity> {
    return httpClient
      .get(`${BASE_URL_POPORING}/v1/sellcoda/notifications/sale_app/feeds`)
      .then((response) => {
        return response.data
      })
      .catch((error) => console.error(`error on AppNotificationDataSource.feeds`, error))
  }

  static read(notificationId: String): Promise<NotificationListEntity> {
    return httpClient
      .put(`${BASE_URL_POPORING}/v1/sellcoda/notifications/read/${notificationId}`)
      .then((response) => {
        return response.data
      })
      .catch((error) => console.error(`error on AppNotificationDataSource.read`, error))
  }
}
