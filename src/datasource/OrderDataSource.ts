import { BASE_URL_POPORING, BASE_URL_WHISPER } from '../config/config'
import { OrderEntity } from '../entities/OrderEntity'
import { OrderListEntity } from '../entities/OrderListEntity'
import { OrderModel } from '../models/OrderModel'
import { httpClient } from '../services/HttpClient'

export class OrderDataSource {
  static comfirmOrder(data: OrderModel): Promise<OrderEntity> {
    return httpClient
      .post(`${BASE_URL_WHISPER}/v1/orders/sellcoda`, data)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.comfirmOrder`, error))
  }

  static getOrderWithStatus(
    territory: string,
    company: string,
    status: string,
    keyword: string = '',
  ): Promise<OrderEntity[]> {
    return httpClient
      .get(
        `${BASE_URL_POPORING}/v4/orders/sellcoda/territory?territory=${territory}&company_id=${company}&status=${status}&keywords=${keyword}`,
      )
      .then((res) => res.data.orders)
      .catch((error) => console.error(`error on CartDataSource.getOrderWithStatus`, error))
  }

  static getOrderListByShopId(
    shopId: string,
    company: string,
    status: string,
    keywords?: string,
  ): Promise<OrderEntity[]> {
    if (keywords) {
      const url = `${BASE_URL_POPORING}/v4/orders/sellcoda?company_id=${company}&dealer_id=${shopId}&status=${status}&keywords=${keywords}`
      return httpClient
        .get(url)
        .then((res) => res.data.orders)
        .catch((error) => console.error(`error on CartDataSource.getOrderListByShopId`, error))
    } else {
      const url = `${BASE_URL_POPORING}/v4/orders/sellcoda?company_id=${company}&dealer_id=${shopId}&status=${status}`
      return httpClient
        .get(url)
        .then((res) => res.data.orders)
        .catch((error) => console.error(`error on CartDataSource.getOrderListByShopId`, error))
    }
  }

  static getOrderDetail(companyId: string, shopId: string, orderNo: string): Promise<OrderEntity> {
    return httpClient
      .get(`${BASE_URL_POPORING}/v4/orders/sellcoda/${orderNo}?company_id=${companyId}&dealer_id=${shopId}`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getOrderDetail`, error))
  }

  static async listOrder(
    status: string,
    company: string,
    limit: number = 10,
    offset = 0,
    territory?: string,
  ): Promise<OrderListEntity> {
    return httpClient
      .get(
        `${BASE_URL_POPORING}/v4/orders/sellcoda/territory?company_id=${company}&territory=${territory}&status=${status}`,
      )
      .then((res) => res.data)
  }
}
