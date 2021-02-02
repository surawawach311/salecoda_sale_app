import { baseURL, BASE_URL_WHISPER } from "../config/develop-config";
import { OrderEntity } from "../entities/OrderEntity";
import { OrderModel } from "../models/OrderModel";
import { httpClient } from "../services/HttpClient";

export class OrderDataSource {
    static comfirmOrder(data: OrderModel): Promise<OrderEntity> {
        return httpClient.post(`${BASE_URL_WHISPER}/v1/orders/sellcoda`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getAllOrder(): Promise<OrderEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/orders?territory=A04&status=waiting_confirm&limit=35`)
            .then(res => res.data.orders)
            .catch(error => console.log(error))
    }

    static getOrderListByShopId(shopId: string): Promise<OrderEntity[]> {
        return httpClient.get(`${baseURL}/v1/sellcoda/orders?buyer=${shopId}&status=waiting_confirm&limit=100`)
            .then(res => res.data.orders)
            .catch(error => console.log(error))
    }
}
