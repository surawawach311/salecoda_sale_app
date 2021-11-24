import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { UserApiEntity } from '../entities/userEntity'
import * as RootNavigation from '../navigations/RootNavigation'
import { UserLocalStorageService } from './UserLocalStorageService'

axios.interceptors.request.use(async (config) => {
  const token = await UserLocalStorageService.getAccessToken();
  const user_profile = await UserLocalStorageService.getUserProfile().then((response: UserApiEntity | null) => response?.user_profile)
  if (user_profile != null) {
    config.headers['Company'] = `${user_profile.company}`
  }
  if (token != null) {
    config.headers['X-Access-Token'] = `${token}`
  }
  return config
})
axios.interceptors.response.use(
  async function (response) {
    return response
  },
  async function (error) {
    const token = await AsyncStorage.getItem('access_token')
    if (500 === error.response.status) {
      RootNavigation.navigate('Auth', {
        screen: "InternalServerError",
      })
    }
    if (401 === error.response.status && token === null) {
      RootNavigation.navigate('Auth', {
        screen: "InputTelNumber",
      })
    }
    if (401 === error.response.status && token !== null) {
      RootNavigation.navigate('Auth', {
        screen: "Unauthorize",
      })
    }
  },
)

export const httpClient = axios
