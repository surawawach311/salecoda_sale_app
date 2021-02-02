import { ShopEntity } from "../entities/ShopEntity";
import { OrderModel, OrderItemModel } from "../models/OrderModel";
import { CartEntity, ItemCart } from "../entities/CartEntity";
import { OrderDataSource } from "../datasource/OrderDataSource";
import { OrderEntity } from "../entities/OrderEntity";
import _, { Dictionary } from "lodash";
import { ShopOrderCardModel } from "../models/ShopOrderCard";

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
                unit: item.sale_unit,
                packing_size: item.packing_size
            }
        })

        let order: OrderModel = {
            seller_id: "icpl",
            buyer_id: shop.id,
            items: items,
            before_discount: cart.before_discount,
            total_discount: cart.total_discount,
            total_price: cart.total_price,
            premium_memo: [],
            discount_memo: [],
            payment_method: cart.selected_payment.id,
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
    static getAllOrder(): Promise<Dictionary<OrderEntity[]>> {
        return OrderDataSource.getAllOrder().then((orders: OrderEntity[]) => {
            const groups = _.groupBy(orders, 'buyer.name');
            return groups

        });
    }

    static formatShopOrderCard() {
        return OrderFacade.getAllOrder().then((res) => {
            return Object.entries(res).map(([key, val]) => {
                const data: ShopOrderCardModel = {
                    id: val[0].buyer_id,
                    name: key,
                    territory: val[0].buyer.zone,
                    province: val[0].buyer.province,
                    totalOrder: val.length
                }
                return data
            }
            );
        });
    }
}