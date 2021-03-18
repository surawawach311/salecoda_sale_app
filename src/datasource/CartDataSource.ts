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
    static addToCartByShopId(shopId: string, itemId: string, quantity: number, payment?: string, useSubsidize?: boolean) {
        const data = {
            action: "adjust",
            item_id: itemId,
            quantity: quantity,
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static removeItem(shopId: string, itemId: string, payment?: string, useSubsidize?: boolean) {
        const data = {
            action: "remove",
            item_id: itemId,
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static calculate(shopId: string, payment?: string, useSubsidize?: boolean) {
        const data = {
            action: "calculate",
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static calculateSpecialRequest(shopId: string, discounts: ItemSpecialRequest[], remark: string) {
        let arr = { discounts, remark }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart/calculate_special_request?shopId=${shopId}`, arr)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static createSpecialRequest(shopId: string, discounts: ItemSpecialRequest[], remark: string): Promise<string> {
        let arr = { discounts, remark }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart/special_request?shopId=${shopId}`, arr)
            .then(res => res.data.id)
            .catch(error => console.log(error))
    }
    static addSpecialRequest(shopId: string, specialId: string, payment?: string, useSubsidize?: boolean) {
        const data = {
            action: "add_special_request",
            special_request_id: specialId,
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static clearSpecialRequest(shopId: string, payment?: string, useSubsidize?: boolean) {
        const data = {
            action: "remove_special_request",
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static clearCart(shopId: string) {
        const data = {
            action: "clear",
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`, data)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
}
