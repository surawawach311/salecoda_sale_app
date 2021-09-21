import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as RootNavigation from '../navigations/RootNavigation'

axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token')
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
