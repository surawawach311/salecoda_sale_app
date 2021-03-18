
export interface ProductEntity {
    id: string,
    item_no: string,
    title: string,
    desc: string,
    price: number,
    common_title: string,
    packing_size: string,
    price_per_volume: number,
    volume_unit: string,
    price_per_sale_unit: number,
    sale_unit: string,
    package_size: string,
    image: string,
    company: string,
    is_have_promotion: boolean
    promotions: PromotionEntity[]
    property: string
}

export interface PromotionEntity {
    id: string
    promotion_type: string
    name: string
    image: string
    desc: string
    start_date: string
    end_date: string
    updated: string
    created: string
}
