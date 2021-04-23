export interface ShopEntity {
    id: string
    name: string
    address: string
    sub_district: string
    district: string
    province: string
    post_code: string
    telephone: string
    territory: string
    zone: string
}

export interface BrandEntity {
    company: string
    shop_id: string
    product_brand: string
    image: string
    product_brand_name: string
}