import { baseURL } from "../config/develop-config";
import { ProductEntity } from "../entities/ProductEntity";
import { ShopEntity } from "../entities/ShopEntity";
import { ShopListEntity } from "../entities/ShopListEntity";
import { httpClient } from "../services/HttpClient";
export class ShopDataSource {
    static getShop(territory: string): Promise<ShopListEntity> {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/customers/dealers?territory=${territory}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
    static getProduct(shopId: string,company:string): Promise<ProductEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/shops/${shopId}/products/prices?limit=100&company=${company}`)
            .then(res => res.data.products)
            .catch(error => console.error(error))
    }
    static getShopById(shopId: string): Promise<ShopEntity> {
        return httpClient.get(`${baseURL}/v1/sellcoda/customers/dealers/${shopId}`)
            .then(res => res.data)
            .catch(error => console.error(error))
    }
}