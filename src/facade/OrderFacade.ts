import { ShopEntity } from "../entities/ShopEntity";
import { OrderModel, OrderItemModel } from "../models/OrderModel";
import { CartEntity, ItemCart } from "../entities/CartEntity";
import { OrderDataSource } from "../datasource/OrderDataSource";
import { OrderEntity } from "../entities/OrderEntity";

export class OrderFacade {

    static confirmOrder(shop: ShopEntity, shippingAddress: ShopEntity, cart: CartEntity): Promise<OrderEntity> {
        let items: OrderItemModel[] = cart.items.map((item: ItemCart) => {
            return {
                id: item.id,
                item_no: item.item_no,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                cover: item.image,
                desc: item.desc,
                unit: item.sale_unit
            }
        })

        let order: OrderModel = {
            seller_id: "icpl",
            buyer_id: shop.id,
            items: items,
            before_discount: cart.before_discount,
            total_discount: cart.total_discount,
            total_price: cart.total_price,
            payment_method: "cash",
            shipping_method: "delivery",
            shipping_address: {
                name: shippingAddress.name,
                telephone: shippingAddress.telephone,
                address: shippingAddress.address,
                district: shippingAddress.district,
                sub_district: shippingAddress.sub_district,
                province: shippingAddress.province,
                post_code: shippingAddress.post_code
            }
        }

        return OrderDataSource.comfirmOrder(order)

    }
}