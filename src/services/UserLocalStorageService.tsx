import AsyncStorage from '@react-native-async-storage/async-storage'
import CryptoES from 'crypto-es'
import { NewUserEntity, UserApiEntity } from '../entities/userEntity'
export class UserLocalStorageService {
  static USER_LOCAL_STORAGE = 'user_profile'
  static KEY_SELLCODA = '9d87f56b7137835eac2e9469f3b065c2'

  static putUserProfile(user_profile: NewUserEntity) {
    const encrypted = CryptoES.AES.encrypt(JSON.stringify(user_profile), this.KEY_SELLCODA).toString()
    AsyncStorage.setItem(this.USER_LOCAL_STORAGE, encrypted)
  }

  static async haveAccessToken(): Promise<boolean> {
    const currentUser = await AsyncStorage.getItem(this.USER_LOCAL_STORAGE)
    if (!currentUser) {
      return false
    } else {
      return true
    }
  }

  static async getUserProfile(): Promise<UserApiEntity | null> {
    const currentUser = await AsyncStorage.getItem(this.USER_LOCAL_STORAGE)
    if (currentUser) {
      const decrypted = CryptoES.AES.decrypt(currentUser, '9d87f56b7137835eac2e9469f3b065c2')
      const user: UserApiEntity = JSON.parse(decrypted.toString(CryptoES.enc.Utf8))
      return user
    } else {
      return null
    }
  }

  static async getAccessToken(): Promise<string | null> {
    const currentUser = await AsyncStorage.getItem(this.USER_LOCAL_STORAGE)
    if (currentUser) {
      const decrypted = CryptoES.AES.decrypt(currentUser, '9d87f56b7137835eac2e9469f3b065c2')
      const user: UserApiEntity = JSON.parse(decrypted.toString(CryptoES.enc.Utf8))
      return user.user_profile.secrets.token
    } else {
      return null
    }
  }

  static async deleteAccessToken(): Promise<void> {
    return await AsyncStorage.removeItem(this.USER_LOCAL_STORAGE)
  }
}
