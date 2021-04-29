import { baseURL } from "../config/develop-config";
import { CartEntity } from "../entities/CartEntity";
import { ShipmentEntity } from "../entities/ShipmentEntity";
import { ItemSpecialRequest } from "../models/SpecialRequestModel";
import { httpClient } from "../services/HttpClient";

export class CartDataSource {
    static getCartByShop(shopId: string, productBrand?: string): Promise<CartEntity> {
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .get(`${baseURL}/v1/sellcoda/cart`, { params })
            .then(res => res.data)
            .catch(error => console.log(error.response.data))
    }

    static addToCartByShopId(shopId: string, itemId: string, quantity: number, payment?: string, useSubsidize?: boolean, productBrand?: string) {
        const data = {
            action: "adjust",
            item_id: itemId,
            quantity: quantity,
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart`, data, { params })
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static removeItem(shopId: string, itemId: string, payment?: string, useSubsidize?: boolean, productBrand?: string) {
        const data = {
            action: "remove",
            item_id: itemId,
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart`, data, { params })
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static calculate(shopId: string, payment?: string, useSubsidize?: boolean, productBrand?: string) {
        const data = {
            action: "calculate",
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart`, data, { params })
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static calculateSpecialRequest(shopId: string, discounts: ItemSpecialRequest[], remark: string, productBrand?: string) {
        let arr = { discounts, remark }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart/calculate_special_request`, arr, { params })
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

    static addSpecialRequest(shopId: string, specialId: string, payment?: string, useSubsidize?: boolean, productBrand?: string) {
        const data = {
            action: "add_special_request",
            special_request_id: specialId,
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart`, data, { params })
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static clearSpecialRequest(shopId: string, payment?: string, useSubsidize?: boolean, productBrand?: string) {
        const data = {
            action: "remove_special_request",
            payment_method: payment,
            is_subsidize: useSubsidize,
        }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart`, data, { params })
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static clearCart(shopId: string, productBrand?: string) {
        const data = {
            action: "clear",
        }
        const params = {
            shopId: shopId,
            ...(productBrand ? { productBrand: productBrand } : {}),
        }
        return httpClient
            .post(`${baseURL}/v1/sellcoda/cart`, data, { params })
            .then(res => res.data)
            .catch(error => console.log(error))
    }

    static getShipment(shopId: string): Promise<ShipmentEntity> {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/customers/dealers/${shopId}/available_shipments`)
            .then(res => res.data)
    }
}
