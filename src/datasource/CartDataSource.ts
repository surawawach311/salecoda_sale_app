import { BASE_URL_SOHEE } from '../config/config'
import { CartEntity } from '../entities/CartEntity'
import { ShipmentEntity } from '../entities/ShipmentEntity'
import { ItemSpecialRequest } from '../models/SpecialRequestModel'
import { httpClient } from '../services/HttpClient'

export class CartDataSource {
  static getCartByShop(company: string, shopId: string, productBrand?: string): Promise<CartEntity> {
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }
    return httpClient
      .get(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, { params })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getCartByShop`, error))
  }

  static addToCartByShopId(
    company: string,
    shopId: string,
    itemId: string,
    quantity: number,
    payment?: string,
    useSubsidize?: boolean,
    productBrand?: string,
  ) {
    const data = {
      action: 'adjust',
      item_id: itemId,
      quantity: quantity,
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
      .catch((error) => console.error(`error on CartDataSource.addToCartByShopId`, error))
  }

  static removeItem(
    company: string,
    shopId: string,
    itemId: string,
    payment?: string,
    useSubsidize?: boolean,
    productBrand?: string,
  ) {
    const data = {
      action: 'remove',
      item_id: itemId,
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
      .catch((error) => console.error(`error on CartDataSource.removeItem`, error))
  }

  static calculate(company: string, shopId: string, payment?: string, useSubsidize?: boolean, productBrand?: string) {
    const data = {
      action: 'calculate',
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
      .catch((error) => console.error(`error on CartDataSource.calculate`, error))
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

  static getShipment(company: string, shopId: string): Promise<ShipmentEntity> {
    const params = { company }
    return httpClient
      .get(`${BASE_URL_SOHEE}/v1/sellcoda/customers/dealers/${shopId}/available_shipments`, { params })
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getShipment`, error))
  }

  static addOrderRemark = (remark: string, company: string, shopId: string, productBrand?: string) => {
    const data = {
      action: 'update_sale_co_remark',
      sale_co_remark: remark,
    }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }

    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { params })
      .then((res) => res.data)
      .catch((err: Error) => alert('Error:' + err.message))
  }

  static updateExcludePromotion = (
    promotionId: Array<string | null>,
    company: string,
    shopId: string,
    productBrand?: string,
  ) => {
    const data = {
      action: 'update_exclude_promotions',
      exclude_promotions: promotionId,
    }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }
    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { params })
      .then((res) => res.data)
      .catch((err: Error) => alert('Error:' + err.message))
  }

  static updatePaymentMethods = (payment: string, company: string, shopId: string, productBrand?: string) => {
    const data = {
      action: 'update_payment_method',
      payment_method: payment,
    }
    const params = {
      shopId: shopId,
      company,
      ...(productBrand ? { productBrand: productBrand } : {}),
    }

    return httpClient
      .post(`${BASE_URL_SOHEE}/v1/sellcoda/cart`, data, { params })
      .then((res) => res.data)
      .catch((err: Error) => alert('Error:' + err.message))
  }
}
