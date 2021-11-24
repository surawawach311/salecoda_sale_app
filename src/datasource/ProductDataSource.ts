import { API_NEW_URL, BASE_URL_SOHEE } from '../config/config'
import { ProductEntity } from '../entities/ProductEntity'
import { ResponseEntity } from '../entities/ResponseEntity'
import { httpClient } from '../services/HttpClient'

export class ProductDataSource {
  static getNameProduct(brand: string, shopNo: string, productId: string): Promise<ResponseEntity<ProductEntity>> {
    return httpClient
      .get(`${API_NEW_URL}/api/v1/products/${productId}`, {
        headers: {
          "Brand-No": brand,
          "Shop-No": shopNo
        }
      })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getNameProduct`, error))
  }
  static getProductList(shopId: string, company: string, brand?: string, keywords?: string): Promise<ProductEntity[]> {
    return httpClient
      .get(
        `${BASE_URL_SOHEE}/v1/sellcoda/shops/${shopId}/products/prices?company=${company}&product_brand=${brand}&keywords=${keywords}&limit=100`,
      )
      .then((res) => res.data.products)
      .catch((error) => console.error(`error on CartDataSource.getProductList`, error))
  }
}
