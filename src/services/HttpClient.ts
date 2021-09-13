import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as RootNavigation from '../navigations/RootNavigation'
import { Unauthorized } from '../components/HttpError/Unauthorized'

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
  function (error) {
    if (401 === error.response.status) {
      RootNavigation.navigate('Auth', {
        screen: 'InputTelNumber',
      })
    }
  },
)

export const httpClient = axios
