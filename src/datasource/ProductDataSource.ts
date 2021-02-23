import { baseURL } from "../config/develop-config";
import { ProductEntity } from "../entities/ProductEntity";
import { httpClient } from "../services/HttpClient";

export class ProductDataSource {
    static getNameProduct(shopId: string, productId: string): Promise<ProductEntity> {
        return httpClient.get(`${baseURL}/v1/sellcoda/shops/${shopId}/products/prices/${productId}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}