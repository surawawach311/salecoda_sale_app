import { UserEntity } from "../entities/userEntity"
import { instanceSohee } from "../config/develop-config";

export class VerifiesDataSource {
    static verifiesPhoneNo(tel: string): Promise<UserEntity> {
        return instanceSohee
            .post(`/v1/sellcoda/mobile/tel/${tel}/verify`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
