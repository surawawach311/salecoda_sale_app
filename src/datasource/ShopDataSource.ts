import { baseURL } from "../config/develop-config";
import { ProductEntity } from "../entities/ProductEntity";
import { ShopListEntity } from "../entities/ShopListEntity";
import { httpClient } from "../services/HttpClient";
export class ShopDataSource {
    static getShop(territory: string): Promise<ShopListEntity> {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/customers/dealers?territory=${territory}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
    static getProduct(shopId: string): Promise<ProductEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/shops/${shopId}/products/prices?limit=10&company=icpl`)
            // /v1/sellcoda/shops/:shopId/products/prices?limit=7&offset=0&company=icpf
            .then(res => res.data.products)
            .catch(error => console.error(error)
            )
    }
}