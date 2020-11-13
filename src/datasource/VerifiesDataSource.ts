import { UserEntity } from "../entities/userEntity"
import { instanceSohee, instanceNpc } from "../config/develop-config";

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
                console.log(response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
