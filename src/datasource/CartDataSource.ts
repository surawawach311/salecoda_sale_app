import { baseURL } from "../config/develop-config";
import { CartEntity } from "../entities/CartEntity";
import { CartFacade } from "../facade/CartFacade";
import { httpClient } from "../services/HttpClient";

export class CartDataSource {
    static getCartByShop(shopId: string): Promise<CartEntity> {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
    static addToCartByShopId(shopId: string, itemId: string, quantity: number) {
        const data = {
            action: "adjust",
            item_id: itemId,
            quantity: quantity,
            payment_method: "cash"
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static removeItem(shopId: string, itemId: string) {
        const data = {
            action: "remove",
            item_id: itemId,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static calculate(shopId: string, payment: string) {
        const data = {
            action: "calculate",
            payment_method: payment,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}