export interface CartEntity {
    items: ItemCart[]
    total_item: number
    total_qty: number
    summary_qty_with_unit: QuantityWithUnit[]
    available_promotions: PromotionCart[]
    applied_promotions: AppliedPromotionCart[]
    available_payments: paymentCartEntity[]
    selected_payment: paymentCartEntity
    before_discount: number
    total_discount: number
    total_price: number
    received_discounts: DiscountEntity[]
    available_premiums: PremiumEntity[]
    received_special_request_discounts: SpecialRequestEnity[]
    total_received_special_request_discount: number
    special_request_id: string
    special_request_remark: string
    usable_subsidize: number
    available_subsidize: number
    subsidize_discount: number
    sale_co_remark: string
}

export interface ItemCart {
    id: string
    item_no: string
    title: string
    desc: string
    price: number
    quantity: number
    image: string
    total_price: number
    price_per_volume: number
    volume_unit: string
    price_per_sale_unit: number
    sale_unit: string
    packing_size: string
    common_name: string
}

export interface PromotionCart {
    promo_id: string
    promo_name: string
    item_id: string
    item_name: string
}

export interface AppliedPromotionCart {
    promo_id: string
    promo_name: string
    item_name: string
    discount: number
}

export interface QuantityWithUnit {
    quantity: number
    unit: string
}

export interface paymentCartEntity {
    discount_rate: number | undefined
    due_date: number | undefined
    id: string
    name: string
    remain_credit: number
}

export interface DiscountEntity {
    id: string
    image: string
    item_id: string
    item_no: string
    name: string
    price: number
    promotion_id: string
    promotion_image: string
    promotion_name: string
    promotion_type: string
    quantity: number
    total: number
    packing_size: string
    sale_unit: string
}

export interface PremiumEntity {
    id: string
    image: string
    item_id: string
    name: string
    price: number
    promotion_id: string
    promotion_image: string
    promotion_name: string
    promotion_type: string
    quantity: number
    item_no: string
    common_name: string
    packing_size: string
    unit: string
}

export interface SpecialRequestEnity {
    id: string
    name: string
    price: number
    quantity: number
    special_request_id: string
    image: string
    item_id: string
    item_no: string
    total: number
    packing_size: string
    sale_unit: string
}