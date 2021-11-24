export interface ShipmentEntity {
    addresses: ShipmentAddress[]
    shipping_method: string

}
export interface ShipmentAddress {
    address: string
    district: string
    name: string
    post_code: string
    province: string
    sub_district: string
    telephone: string
}
