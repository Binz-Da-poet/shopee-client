import { Product } from './product.type'

export interface CartItem {
  id: number
  product: Product
  quantity: number
  status: number
}
export interface ExtendedPurchase extends CartItem {
  checked: boolean
  disabled: boolean
}
export interface AddCartItemRequest {
  productId?: number
  shoppingCartId?: number
  quantity?: number
  status?: number
}
