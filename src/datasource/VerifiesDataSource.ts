import { UserEntity } from '../entities/userEntity'
import { BASE_URL_SOHEE, BASE_URL_NPC, BASE_URL_KEY_OF_UNDERGROUND } from '../config/config'
import { TokenEntity } from '../entities/TokenEntity'
import { httpClient } from '../services/HttpClient'

export class VerifiesDataSource {
  static verifyPhoneNo(tel: string): Promise<UserEntity> {
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/staffs/verify_mobile`, { telephone: tel })
      .then((response) => {
        return response.data
      })
      .catch((error) => console.error(`error on VerifiesDataSource.verifyPhoneNo`, error))
  }

  static verifyOtp(phone: string, otp: string): Promise<UserEntity> {
    return httpClient
      .post(`${BASE_URL_NPC}/v1/sellcoda/otp/verify`, { phone: phone, otp: otp })
      .then((response) => {
        return response.data
      })
      .catch((error) => console.error(`error on VerifiesDataSource.verifyOtp`, error))
  }

  static login(userProfile: UserEntity): Promise<TokenEntity> {
    return httpClient
      .post(`${BASE_URL_KEY_OF_UNDERGROUND}/v1/sellcoda/auth/login/mobile`, {
        user_id: userProfile.id,
        name: userProfile.name,
        mobile: userProfile.telephone,
        email: userProfile.email,
        role: 'staff',
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => console.error(`error on VerifiesDataSource.login`, error))
  }

  static getProfile(): Promise<UserEntity> {
    return httpClient
      .get(`${BASE_URL_SOHEE}/v1/sellcoda/staffs/profile`)
      .then((response) => {
        return response.data
      })
  }
}
