export interface UserEntity {
    id: string,
    name: string,
    nickname: string,
    position: string,
    image: string,
    territory: string,
    email: string,
    telephone: string,
    company: string,
}
export interface NewUserEntity {
    company: string,
    username: string,
    phone_number: string,
    picture: string,
    firstname: string,
    lastname: string,
    birth_day: string,
    user_type: string,
    role: {
        id: string,
        name: string
    },
    secrets: {
        totken: string,
        expried: string
    }
}

