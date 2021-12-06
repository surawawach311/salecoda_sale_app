import { API_NEW_URL, BASE_URL_SOHEE } from '../config/config'
import { ProductCategoryEntity } from '../entities/ProductCategory'
import { ProductApiEntity, ProductEntity } from '../entities/ProductEntity'
import { ResponseEntity } from '../entities/ResponseEntity'
import { ApiShopEntity, BrandEntity, ShopEntity } from '../entities/ShopEntity'
import { httpClient } from '../services/HttpClient'
export class ShopDataSource {
  static getShop(territory: string, keywords?: string): Promise<ResponseEntity<ApiShopEntity>> {
    if (keywords) {
      return httpClient
        .get(`${API_NEW_URL}/api/v1/shops?territory=${territory}&search=${keywords}&limit=100`)
        .then((res) => res.data)
        .catch((error) => console.error(`error on CartDataSource.getShop`, error))
    } else {
      return httpClient
        .get(`${API_NEW_URL}/api/v1/shops?territory=${territory}&limit=100`)
        .then((res) => res.data)
        .catch((error) => console.error(`error on CartDataSource.getShop`, error))
    }
  }

  static getProductCategory(shopNo: string, brand: string): Promise<ResponseEntity<ProductCategoryEntity[]>> {
    const params = {
      action: 'checkout'
    }
    const headers = {
      "Brand-No": brand,
      "Shop-No": shopNo
    }
    return httpClient
      .get(`${API_NEW_URL}/api/v1/product-category`, { headers })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getProductCategory`, error))
  }

  static getProduct(shopNo: string, brand?: string, category?: string, search?: string): Promise<ResponseEntity<ProductApiEntity>> {
    const params = {
      ...(category !== "All" ? { "category_code": category } : {}),
      ...(search ? { "search": search } : {}),
    }
    const headers = {
      "Brand-No": brand,
      "Shop-No": shopNo
    }
    return httpClient
      .get(`${API_NEW_URL}/api/v1/products`, { params, headers })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getProduct`, error))
  }

  static getProductWithBrand(shopId: string, company: string, product_brand?: string): Promise<ResponseEntity<ProductApiEntity>> {
    return httpClient
      .get(`${API_NEW_URL}/api/v1/products`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getProductWithBrand`, error))
  }
  static getShopById(shopId: string): Promise<ShopEntity> {
    return httpClient
      .get(`${BASE_URL_SOHEE}/v1/sellcoda/customers/dealers/${shopId}`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getShopById`, error))
  }

  static getBrandByShopId(shopId: string, company: string): Promise<ResponseEntity<BrandEntity[]>> {
    return httpClient
      .get(`${API_NEW_URL}/api/v1/product/brands`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getBrandByShopId`, error))
  }
}
