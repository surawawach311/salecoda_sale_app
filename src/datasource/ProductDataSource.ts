import { BASE_URL_SOHEE } from '../config/config'
import { ProductEntity } from '../entities/ProductEntity'
import { httpClient } from '../services/HttpClient'

export class ProductDataSource {
  static getNameProduct(shopId: string, productId: string): Promise<ProductEntity> {
    return httpClient
      .get(`${BASE_URL_SOHEE}/v1/sellcoda/shops/${shopId}/products/prices/${productId}`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getNameProduct`, error))
  }
  static getProductList(shopId: string, company: string, keywords: string): Promise<ProductEntity[]> {
    return httpClient
      .get(
        `${BASE_URL_SOHEE}/v1/sellcoda/shops/${shopId}/products/prices?company=${company}&keywords=${keywords}&limit=100`,
      )
      .then((res) => res.data.products)
      .catch((error) => console.error(`error on CartDataSource.getProductList`, error))
  }
}
