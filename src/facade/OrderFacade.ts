import { ShopEntity } from "../entities/ShopEntity";
import { OrderModel, OrderItemModel } from "../models/OrderModel";
import { CartEntity, ItemCart, PremiumEntity } from "../entities/CartEntity";
import { OrderDataSource } from "../datasource/OrderDataSource";
import { OrderEntity, PremiumOrderEntity } from "../entities/OrderEntity";
import _, { Dictionary } from "lodash";
import { ShopOrderCardModel } from "../models/ShopOrderCard";
import { Shipment } from "../screens/CartScreen/Shipment";

export class OrderFacade {

    static confirmOrder(company: string, shop: ShopEntity, shipment: Shipment, cart: CartEntity, subsidize: number = 0, productBrand?: string): Promise<OrderEntity> {
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
                packing_size: item.packing_size,
                common_name: item.common_name,
            }
        })

        let premium_items: PremiumOrderEntity[] = cart.available_premiums.map((item: PremiumEntity) => {
            return {
                id: item.id,
                item_no: item.item_no,
                price: item.price,
                quantity: item.quantity,
                name: item.name,
                common_name: item.common_name,
                packing_size: item.packing_size,
                unit: item.unit,
                cover: item.image,
                promotion_id: item.promotion_id,
                promotion_name: item.promotion_name,
                promotion_image: item.promotion_image,
                item_id: item.item_id,
            }
        })

        let order: OrderModel = {
            seller_id: company,
            buyer_id: shop.id,
            items: items,
            before_discount: cart.before_discount,
            total_discount: cart.total_discount,
            total_price: cart.total_price,
            premium_memo: premium_items,
            discount_memo: cart.received_discounts,
            payment_method: cart.selected_payment.id,
            shipping_method: shipment.method,
            shipping_address: {
                name: shipment.name,
                telephone: shipment.telephone,
                address: shipment.address,
                district: shipment.district,
                sub_district: shipment.subDistrict,
                province: shipment.province,
                post_code: shipment.postCode,
                remark: shipment.remark,
            },
            special_request_discounts: cart.received_special_request_discounts,
            special_request_id: cart.special_request_id,
            special_request_remark: cart.special_request_remark,
            subsidize: subsidize,
            product_brand: productBrand,
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