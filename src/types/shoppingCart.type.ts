import { CartItem } from './CartItem.type'
import { DeliveryCart } from './DeliveryCart.type'
import { User } from './user.type'

export interface shoppingCart {
  id: number
  cartItems?: Array<CartItem>
  User: User
  deliveryCarts?: Array<DeliveryCart>
}
