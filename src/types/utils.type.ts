import { ProductList } from './product.type'
import { User } from './user.type'

export interface ResponseApi {
  message: string
  token?: string
  user: User
}
export interface ResImgApi {
  message: string
  status: string
  data: string
}
export interface ErrorResponseForm {
  message: string
  token?: string
  user?: User
}
export interface ResProductPageApi {
  status: string
  message: string
  data: ProductList
}
export interface SuccessResponse<Data> {
  message: string
  status: string
  data: Data
}
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
