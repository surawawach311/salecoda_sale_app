export interface NotificationListEntity {
  data: NotificationEntity[]
  count: number
}

export interface NotificationEntity {
  id: string
  account_id: string
  title: string
  body: string
  order_no: string
  order_item: []
  is_delete: boolean
  app_type: string
  created: string
  updated: string
  is_read: boolean
  buyer_id: string
}

export interface OrderItem {
  title: string,
  price: number,
  quantity: number,
  cover: string,
  original_price: number
}
