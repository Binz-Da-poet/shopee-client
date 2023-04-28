import { CartItem } from './CartItem.type'
import { User } from './user.type'

export interface shoppingCart {
  id: number
  cartItems?: Array<CartItem>
  User: User
}
export interface AddCartItemRequest {
  productId?: number
  shoppingCartId?: number
  quantity?: number
  status?: number
}
