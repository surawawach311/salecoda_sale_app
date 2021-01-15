import { baseURL, BASE_URL_WHISPER } from "../config/develop-config";
import { OrderEntity } from "../entities/OrderEntity";
import { OrderModel } from "../models/OrderModel";
import { httpClient } from "../services/HttpClient";

export class OrderDataSource {
    static comfirmOrder(data: OrderModel): Promise<OrderEntity> {
        console.log(data)
        return httpClient.post(`${BASE_URL_WHISPER}/v1/orders/sellcoda`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}

