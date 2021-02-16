import { baseURL } from "../config/develop-config";
import { CartEntity } from "../entities/CartEntity";
import { ItemSpecialRequest } from "../models/SpecialRequestModel";
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

    static calculateSpecialRequest(shopId: string, data: ItemSpecialRequest[]) {
        let arr = { data }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart/calculate_special_request?shopId=${shopId}`, arr)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static createSpecialRequest(shopId: string, data: ItemSpecialRequest[]): Promise<string> {
        let arr = { 'data': data }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart/special_request?shopId=${shopId}`, arr)
            .then(res => res.data.id)
            .catch(error => console.log(error))
    }
    static addSpecialRequest(shopId: string, specialId: string) {
        const data = {
            action: "add_special_request",
            special_request_id: specialId,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}