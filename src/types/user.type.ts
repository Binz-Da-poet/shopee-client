import { shoppingCart } from './shoppingCart.type'

export type Role = 'ROLE_USER' | 'ROLE_ADMIN'
export interface User {
  userId: number
  fullName: string
  avatar: string
  address: string
  phoneNumber: string
  email: string
  password: string
  role: Role
  orders: []
  shoppingCarts: [shoppingCart]
  enabled: true
  authorities: [
    {
      authority: Role
    }
  ]
  username: string
  accountNonExpired: true
  credentialsNonExpired: true
  accountNonLocked: true
}
export interface UpdateUser {
  fullName: string
  avatar: string
  address: string
  phoneNumber: string
  email: string
  password: string
  Image: FileList
}
