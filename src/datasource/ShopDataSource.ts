import { baseURL } from "../config/develop-config";
import { ShopEntity } from "../entities/ShopEntity";
import { ShopEntityList } from "../entities/ShopEntityList";
import { httpClient } from "../services/HttpClient";
export class ShopDataSource {
    static getShop(): Promise<ShopEntityList> {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/customers/dealers`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}