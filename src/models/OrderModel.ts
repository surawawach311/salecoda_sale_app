export interface OrderModel {
    buyer_id: string
    seller_id: string
    items: OrderItemModel[]
    before_discount: number
    total_discount: number
    total_price: number
    shipping_method: string
    payment_method: string
    premium_memo: []
    discount_memo: []
    shipping_address: ShippingAdressModel
}

export interface OrderItemModel {
    cover: string
    desc: string
    id: string
    item_no: string
    price: number
    quantity: number
    title: string
    unit: string
    packing_size: string
}

export interface ShippingAdressModel {
    name: string
    telephone: string
    address: string
    district: string
    sub_district: string
    province: string
    post_code: string
}

export interface PromotionModel {
    id: string
    quantity: number
    promotion_id: string
    promotion_image: string
}