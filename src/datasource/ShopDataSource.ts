import { baseURL } from "../config/develop-config";
import { ProductEntity } from "../entities/ProductEntity";
import { ShopListEntity } from "../entities/ShopListEntity";
import { httpClient } from "../services/HttpClient";
export class ShopDataSource {
    static getShop(): Promise<ShopListEntity> {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/customers/dealers`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
    static getProduct(): Promise<ProductEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/products/prices?limit=10`)
            .then(res => res.data.products)
            .catch(error => console.error(error)
            )
    }
}