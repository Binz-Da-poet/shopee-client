export type Role = 'USER' | 'ADMIN'
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
  shoppingCarts: []
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
