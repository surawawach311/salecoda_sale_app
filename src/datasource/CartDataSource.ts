import { API_NEW_URL, BASE_URL_SOHEE } from '../config/config'
import { CartEntity } from '../entities/CartEntity'
import { ResponseEntity } from '../entities/ResponseEntity'
import { ShipmentEntity } from '../entities/ShipmentEntity'
import { ItemSpecialRequest } from '../models/SpecialRequestModel'
import { httpClient } from '../services/HttpClient'

export class CartDataSource {
  static getCartByShop(shopNo: string, brand?: string): Promise<ResponseEntity<CartEntity>> {
    return httpClient
      .get(`${API_NEW_URL}/promotion-order/api/v1/cart`, {
        headers: {
          "Brand-No": brand,
          "Shop-No": shopNo
        }
      })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getCartByShop`, error))
  }

  static addToCartByShopId(
    shopNo: string,
    brand: string | undefined,
    prod_id: string,
    quantity: number,
  ): Promise<ResponseEntity<CartEntity>> {
    const data = {
      action: 'add',
      prod_id: prod_id,
      quantity: quantity,
    }
    return httpClient
      .post(`${API_NEW_URL}/promotion-order/api/v1/cart/calculate`, data, {
        headers: {
          "Brand-No": brand,
          "Shop-No": shopNo
        }
      })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.addToCartByShopId`, error))
  }

  static removeItem(shopNo: string, itemId: string, brand?: string) {
    const data = {
      action: 'remove',
      item_id: itemId,

    }
    const headers = {
      "Shop-No": shopNo,
      ...(brand ? { "Brand-No": brand } : {}),
    }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { headers })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.removeItem`, error))
  }

  static calculate(shopNo: string, payment?: string, brand?: string): Promise<ResponseEntity<CartEntity>> {
    const data = {
      action: 'calculate',
      payment_method: payment,
    }
    const headers = {
      "Shop-No": shopNo,
      ...(brand ? { "Brand-No": brand } : {}),
    }
    console.log(headers);

    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { headers })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.calculate`, error))
  }

  static updateSubidizeDiscount(shopNo: string, useSubsidize?: boolean, Brand?: string) {
    const data = {
      action: 'update_is_subsidize',
      is_subsidize: useSubsidize,
    }
    const headers = {
      "Shop-No": shopNo,
      ...(Brand ? { "Brand-No": Brand } : {})
    }
    return httpClient
      .post(`${API_NEW_URL}/promotion-order/api/v1/cart/calculate`, data, { headers })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.update_is_subsidize`, error))
  }

  static calculateSpecialRequest(
    company: string,
    shopId: string,
    discounts: ItemSpecialRequest[],
    remark: string,
    productBrand?: string,
  ) {
    let arr = { discounts, remark }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart/calculate_special_request`, arr, { params })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.calculateSpecialRequest`, error))
  }

  static createSpecialRequest(shopId: string, discounts: ItemSpecialRequest[], remark: string): Promise<string> {
    let arr = { discounts, remark }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart/special_request?shopId=${shopId}`, arr)
      .then((res) => res.data.id)
      .catch((error) => console.error(`error on CartDataSource.createSpecialRequest`, error))
  }

  static addSpecialRequest(
    company: string,
    shopId: string,
    specialId: string,
    payment?: string,
    useSubsidize?: boolean,
    productBrand?: string,
  ) {
    const data = {
      action: 'add_special_request',
      special_request_id: specialId,
      payment_method: payment,
      is_subsidize: useSubsidize,
    }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { params })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.addSpecialRequest`, error))
  }

  static clearSpecialRequest(
    company: string,
    shopId: string,
    payment?: string,
    useSubsidize?: boolean,
    productBrand?: string,
  ) {
    const data = {
      action: 'remove_special_request',
      payment_method: payment,
      is_subsidize: useSubsidize,
    }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { params })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.clearSpecialRequest`, error))
  }

  static clearCart(company: string, shopId: string, productBrand?: string) {
    const data = {
      action: 'clear',
    }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { params })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.clearCart`, error))
  }

  static getShipment(company: string, shopNo: string): Promise<ResponseEntity<ShipmentEntity[]>> {
    return httpClient
      .get(`${API_NEW_URL}/api/v1/address/shipping-order`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getShipment`, error))
  }

  static addOrderRemark = (remark: string, shopNo: string, Brand?: string): Promise<ResponseEntity<CartEntity>> => {
    const data = {
      action: 'update_sale_co_remark',
      sale_co_remark: remark,
    }
    const headers = {
      "Shop-No": shopNo,
      ...(Brand ? { "Brand-No": Brand } : {})
    }
    return httpClient
      .post(`${API_NEW_URL}/promotion-order/api/v1/cart/calculate`, data, { headers })
      .then((res) => res.data)
      .catch((err: Error) => console.error(`error on CartDataSource.addOrderRemark`, err))
  }

  static updateExcludePromotion = (
    promotionId: Array<string | null>,
    shopNo: string,
    Brand?: string
  ) => {
    const data = {
      action: 'update_exclude_promotions',
      exclude_promotions: promotionId,
    }
    const headers = {
      "Shop-No": shopNo,
      ...(Brand ? { "Brand-No": Brand } : {})
    }
    return httpClient
      .post(`${API_NEW_URL}/promotion-order/api/v1/cart/calculate`, data, { headers })
      .then((res) => res.data)
      .catch((err: Error) => alert('Error:' + err.message))
  }

  static updatePaymentMethods = (payment: string, shopNo: string, Brand?: string): Promise<ResponseEntity<CartEntity>> => {
    const data = {
      action: 'update_payment_method',
      payment_method: payment,
    }
    const headers = {
      "Shop-No": shopNo,
      ...(Brand ? { "Brand-No": Brand } : {}),
    }
    return httpClient
      .post(`${API_NEW_URL}/promotion-order/api/v1/cart/calculate`, data, { headers })
      .then((res) => res.data)
      .catch((err: Error) => alert('Error:' + err.message))
  }
}
