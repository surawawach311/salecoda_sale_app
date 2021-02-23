import { CartDataSource } from "../datasource/CartDataSource";
import { ItemSpecialRequest } from "../models/SpecialRequestModel";

export class CartFacade {
    static createSpecialRequest(shopId: string, request: ItemSpecialRequest[]) {
        let ItemRequest = request.filter((item) => item.amount != 0)
        return CartDataSource.createSpecialRequest(shopId, ItemRequest).then((res) => res)
    }
}