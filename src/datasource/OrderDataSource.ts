import { API_NEW_URL, BASE_URL_POPORING, BASE_URL_WHISPER } from '../config/config'
import { OrderApiEntity, OrderEntity } from '../entities/OrderEntity'
import { OrderListEntity } from '../entities/OrderListEntity'
import { ResponseEntity } from '../entities/ResponseEntity'
import { ShopGroupOrderEntity } from '../entities/ShopGroupOrderEntity'
import { OrderModel } from '../models/OrderModel'
import { httpClient } from '../services/HttpClient'

export class OrderDataSource {
  static comfirmOrder(shopNo: string, brand: string | undefined): Promise<ResponseEntity<OrderApiEntity>> {
    const data = {
      action: 'checkout'
    }
    return httpClient
      .post(`${API_NEW_URL}/promotion-order/api/v1/cart/calculate`, data, {
        headers: {
          "Brand-No": brand,
          "Shop-No": shopNo
        }
      })
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

  static getOrderDetail(orderId: string): Promise<ResponseEntity<OrderEntity>> {
    return httpClient
      .get(`${API_NEW_URL}/promotion-order/api/v1/orders/${orderId}`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getOrderDetail`, error))
  }

  static getOrderStatus(): Promise<ResponseEntity<{ key: string; title: string }[]>> {
    return httpClient
      .get(`${API_NEW_URL}/promotion-order/api/v1/orders/status/saleapp`)
      .then((res) => res.data)
      .catch((error) => console.error(`error on CartDataSource.getOrderStatus`, error))
  }

  static async listOrder(
    status: string,
    limit: number = 10,
    offset = 0,
    territory?: string,
  ): Promise<ResponseEntity<OrderEntity[]>> {
    const params = {
      order_status: status
    }
    return httpClient
      .get(
        `${API_NEW_URL}/promotion-order/api/v1/orders`, { params },
      )
      .then((res) => res.data)
  }

  static async GroupShopOrderList(
    status: string,
    limit: number = 10,
    offset = 0,
    territory?: string,
    start_date?: string,
    end_date?: string
  ): Promise<ResponseEntity<ShopGroupOrderEntity[]>> {
    const params = {
      order_status: status,
      territory: territory,
      ...(start_date ? { "start_date": start_date } : {}),
      ...(end_date ? { "end_date": end_date } : {}),
    }
    return httpClient
      .get(
        `${API_NEW_URL}/promotion-order/api/v1/orders/shops`, { params },
      )
      .then((res) => res.data)
  }
}
