import { ShopEntity } from "../entities/ShopEntity";
import { OrderModel, OrderItemModel } from "../models/OrderModel";
import { CartEntity, ItemCart, PremiumEntity } from "../entities/CartEntity";
import { OrderDataSource } from "../datasource/OrderDataSource";
import { OrderEntity, PremiumOrderEntity } from "../entities/OrderEntity";
import _, { Dictionary } from "lodash";
import { ShopOrderCardModel } from "../models/ShopOrderCard";

export class OrderFacade {

    static confirmOrder(shop: ShopEntity, shippingAddress: ShopEntity, cart: CartEntity, subsidize: number = 0): Promise<OrderEntity> {
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

        let premium_items: PremiumOrderEntity[] = cart.available_premiums.map((item: PremiumEntity) => {
            return {
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name,
                cover: item.image,
                promotion_id: item.promotion_id,
                promotion_name: item.promotion_name,
                promotion_image: item.promotion_image,
                item_id: item.item_id
            }
        })

        let order: OrderModel = {
            seller_id: "icpl",
            buyer_id: shop.id,
            items: items,
            before_discount: cart.before_discount,
            total_discount: cart.total_discount,
            total_price: cart.total_price,
            premium_memo: premium_items,
            discount_memo: cart.received_discounts,
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
            },
            special_request_discounts: cart.received_special_request_discounts,
            special_request_id: cart.special_request_id,
            subsidize: subsidize,
        }

        return OrderDataSource.comfirmOrder(order)
    }
    static getAllOrder(territory: string, company: string, status: string): Promise<Dictionary<OrderEntity[]>> {
        return OrderDataSource.getOrderWithStatus(territory, company, status).then((orders: OrderEntity[]) => {
            const groups = _.groupBy(orders, 'buyer.name');
            return groups

        });
    }

    static formatShopOrderCard(territory: string, company: string, status: string) {
        return OrderFacade.getAllOrder(territory, company, status).then((res) => {
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