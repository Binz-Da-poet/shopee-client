import { Product } from './product.type'

export interface DeliveryCart {
  id: number
  product: Product
  quantity: number
  address: string
  fullName: string
  phoneNumber: string
}
export interface PayPurchases {
  ShoppingCartId: number | undefined
  purchaseIds: number[]
  address: string
  fullName: string
  phoneNumber: string
}
