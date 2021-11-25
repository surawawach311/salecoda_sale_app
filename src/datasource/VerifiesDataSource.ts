import { NewUserEntity, UserApiEntity, UserEntity } from '../entities/userEntity'
import { BASE_URL_SOHEE, BASE_URL_KEY_OF_UNDERGROUND, API_NEW_URL } from '../config/config'
import { TokenEntity } from '../entities/TokenEntity'
import { httpClient } from '../services/HttpClient'
import { ResponseEntity } from '../entities/ResponseEntity'
import { OtpRequestEntity } from '../entities/OtpRequestEntity'

export class VerifiesDataSource {
  static verifyPhoneNo(tel: string): Promise<ResponseEntity<OtpRequestEntity>> {
    return httpClient
      .post(`${API_NEW_URL}/auth/api/v1/login/request-otp`, { app_name: "saleapp", mobile: tel })
      .then((response) => {
        return response.data
      })
      .catch((error) => { throw new Error(error.response) })
  }

  static verifyOtp(phone: string, otp: string, refNo: string, platform: string, fcmToken?: string): Promise<ResponseEntity<UserApiEntity>> {
    console.log({ app_name: "saleapp", mobile: phone, ref_no: refNo, otp: otp, platform: platform, fcm_token: fcmToken });

    return httpClient
      .post(`${API_NEW_URL}/auth/api/v1/login/verify-otp`, { app_name: "saleapp", mobile: phone, ref_no: refNo, otp: otp, platform: platform, ...(fcmToken ? { fcm_token: fcmToken } : { fcm_token: "" }), })
      .then((response) => {
        console.log(response);

        return response.data
      })
      .catch((error) => {
        console.log("erroe" + error);
      })

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
