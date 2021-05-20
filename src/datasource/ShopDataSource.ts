import { baseURL } from "../config/config";
import { ProductEntity } from "../entities/ProductEntity";
import { BrandEntity, ShopEntity } from "../entities/ShopEntity";
import { ShopListEntity } from "../entities/ShopListEntity";
import { httpClient } from "../services/HttpClient";
export class ShopDataSource {
    static getShop(territory: string, keywords?: string): Promise<ShopListEntity> {
        if (keywords) {
            return httpClient
                .get(`${baseURL}/v1/sellcoda/customers/dealers?territory=${territory}&keywords=${keywords}&limit=100`)
                .then(res => res.data)
                .catch(error => console.log(error))
        } else {
            return httpClient
                .get(`${baseURL}/v1/sellcoda/customers/dealers?territory=${territory}&limit=100`)
                .then(res => res.data)
                .catch(error => console.log(error))
        }

    }
    static getProduct(shopId: string, company: string, product_brand?: string): Promise<ProductEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/shops/${shopId}/products/prices?limit=100&company=${company}`)
            .then(res => res.data.products)
            .catch(error => console.log(error))
    }

    static getProductWithBrand(shopId: string, company: string, product_brand?: string): Promise<ProductEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/shops/${shopId}/products/prices?limit=100&company=${company}&product_brand=${product_brand}`)
            .then(res => res.data.products)
            .catch(error => console.log(error))
    }
    static getShopById(shopId: string): Promise<ShopEntity> {
        return httpClient.get(`${baseURL}/v1/sellcoda/customers/dealers/${shopId}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getBrandByShopId(shopId: string, company: string): Promise<BrandEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/customers/dealers/${shopId}/product_brand?company=${company}`)
            .then(res => res.data.data)
            .catch(error => console.log(error))
    }
}