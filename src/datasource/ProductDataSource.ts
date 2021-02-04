import { baseURL } from "../config/develop-config";
import { ProductEntity } from "../entities/ProductEntity";
import { httpClient } from "../services/HttpClient";

export class ProductDataSource {
    static getNameProduct(productId: string): Promise<ProductEntity> {
        return httpClient.get(`${baseURL}/v1/sellcoda/products/prices/${productId}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}