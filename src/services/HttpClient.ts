import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

axios.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('access_token')

    if (token != null) {
        config.headers["X-Access-Token"] = `${token}`;
    }
    return config
})

export const httpClient = axios