export interface UserEntity {
    id: string
    name: string
    nickname: string
    position: string
    image: string
    territory: string
    email: string
    telephone: string
    company: string
}
export interface NewUserEntity {
    company: string
    username: string
    phone_number: string
    picture: string
    firstname: string
    lastname: string
    birth_day: string
    territory: string
    user_type: string
    role: {
        id: string
        name: string
    }
    secrets: {
        token: string
        expried: string
    }
}
export interface UserApiEntity {
    app_setting: {
        cartPage: {
            checkJoinCoDiscount: "enable" | "disable"
            checkJoinPromotion: "enable" | "disable"
        }
        productDetail: {
            showPromotionLabel: boolean
        }
        productPage: {
            showProductPrice: boolean
            showPromotionLabel: boolean
        }
    }
    user_permissions: {
        comfirm_cancel_order: boolean
        create_order: boolean
        show_special_request: boolean
    }
    user_profile: NewUserEntity
}

