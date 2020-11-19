import { UserEntity } from "../entities/userEntity"
import { instanceSohee, instanceNpc, instanceKeyOfUnderground } from "../config/develop-config";
import { UserLocalStorageService } from "../services/UserLocalStorageService";
import { AxiosResponse } from "axios";

export class VerifiesDataSource {
    static verifyPhoneNo(tel: string): Promise<UserEntity> {
        return instanceSohee
            .post(`/v1/sellcoda/staffs/verify_mobile`, { 'telephone': tel })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static verifyOtp(phone: string, otp: string): Promise<UserEntity> {
        return instanceNpc
            .post(`/v1/sellcoda/otp/verify`, { 'phone': phone, 'otp': otp })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    static login(userProfile: UserEntity): Promise<any> {
        return instanceKeyOfUnderground
            .post("/sellcoda/auth/login/mobile",
                {
                    'user_id': userProfile.id,
                    'name': userProfile.name,
                    'mobile': userProfile.telephone,
                    'email': userProfile.email,
                    'role': 'staff'
                })
            .then((response) => {
                return JSON.stringify(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }
}
