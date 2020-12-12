import { baseURL } from "../config/develop-config";
import { httpClient } from "../services/HttpClient";

export class CartDataSource {
    static getCartByShop(shopId: string) {
        return httpClient
            .get(`${baseURL}/v1/sellcoda/cart?shopId=${shopId}`)
            .then(res => res.data)
            .catch(error => console.log(error))
    }
    static addToCartByShopId(shopId: string, itemId: string, quantity: number) {
        console.log(quantity)
        
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
}