export interface CartEntity {
    items: ItemCart[]
    total_item: number
    total_qty: number
    summary_qty_with_unit: QuantityWithUnit[]
    available_promotions: PromotionCart[]
    applied_promotions: AppliedPromotionCart[]
    available_payments: []
    selected_payment: paymentCartEntity
    before_discount: number
    total_discount: number
    total_price: number
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