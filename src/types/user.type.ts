import { shoppingCart } from './shoppingCart.type'

export type Role = 'ROLE_USER' | 'ROLE_ADMIN'
export type State = 'Locked' | 'NonLocked'
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
  shoppingCart: shoppingCart
  enabled: true
  authorities: [
    {
      authority: Role
    }
  ]
  status: State
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
