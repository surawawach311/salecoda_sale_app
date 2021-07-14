import { ShopEntity } from "./ShopEntity"

export interface OrderEntity {
    id: string
    order_no: string
    buyer_id: string
    seller_id: string
    status: string
    items: OrderItemEnitity[]
    before_discount: number
    total_discount: number
    total_price: number
    payment_method: string
    shipping_method: string
    shipping_address: ShippingAdressEntity
    created_with: string
    created_with_id: string
    remark: string
    is_approved_credit_limit: boolean
    updated_by: string
    created_by: string
    updated: string
    created: string
    buyer: ShopEntity
    premium_memo: PremiumOrderEntity[]
    discount_memo: DiscountOrderEntity[]
    special_request_discounts: SpecialOrderEntity[]
    subsidize: number
    special_request_remark: string
    sale_co_remark: string
}

export interface OrderItemEnitity {
    id: string
    item_no: string
    title: string
    desc: string
    price: number
    quantity: number
    unit: string
    cover: string
    original_price: string
    packing_size: string
}

export interface ShippingAdressEntity {
    name: string
    telephone: string
    line_one: string
    line_two: string
    district: string
    sub_district: string
    province: string
    post_code: string
    country: string
    remark: string
}

export interface PremiumOrderEntity {
    id: string
    item_no: string
    price: number
    quantity: number
    name: string
    common_name: string
    packing_size: string
    unit: string
    cover: string
    promotion_id: string
    promotion_name: string
    promotion_image: string
    item_id: string
}

export interface DiscountOrderEntity {
    id: string
    price: number
    quantity: number
    name: string
    promotion_id: string
    promotion_name: string
    promotion_image: string
    item_id: string
}

export interface SpecialOrderEntity {
    id: string
    image: string
    item_id: string
    item_no: string
    name: string
    price: number
    quantity: number
    special_request_id: string
    total: number
}