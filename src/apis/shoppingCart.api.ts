import { AddCartItemRequest, CartItem } from 'src/types/CartItem.type'
import { shoppingCart } from 'src/types/shoppingCart.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const ShoppingCartURL = '/shopping-carts'
const CartItemURL = '/CartItem'
const DeliveryCartUrl = '/DeliveryCart'
const ShoppingCartApi = {
  createCart: (id: number) => http.post<SuccessResponse<User>>(`${ShoppingCartURL}/addShoppingCart`, id),
  addCartItem: (body: AddCartItemRequest) => http.post<SuccessResponse<CartItem>>(`${CartItemURL}/add`, body),
  getShoppingCart: (body: number | undefined) => http.post<shoppingCart>(`${ShoppingCartURL}/shoppingCart`, body),
  getDelivery: (data: { productIds: number[]; shoppingCartId?: number }) =>
    http.post<SuccessResponse<Array<CartItem>>>(`${CartItemURL}/getCartItemsByProductAndShoppingCart`, data),
  getCartItemById: (body: { shoppingCartId: number | undefined }) =>
    http.post<SuccessResponse<Array<CartItem>>>(`${CartItemURL}/getCartItemByShoppingCart`, body),
  updateCartItem: (body: AddCartItemRequest) => http.put<SuccessResponse<CartItem>>(`${CartItemURL}/update`, body),
  updateCartItemStatus: (data: { productIds: number[]; shoppingCartId?: number; status: number }) =>
    http.put<SuccessResponse<CartItem>>(`${CartItemURL}/updateStatus`, data),
  deleteCartItem: (data: AddCartItemRequest) =>
    http.delete<SuccessResponse<CartItem>>(`${CartItemURL}/delete`, { data }),
  deleteManyCartItems: (data: { productIds: number[]; shoppingCartId?: number; status: number }) =>
    http.delete<SuccessResponse<CartItem>>(`${CartItemURL}/deleteMany`, { data }),
  addDeliveryCart: (data: {
    productIds: number[]
    shoppingCartId?: number
    fullName: string
    address: string
    phoneNumber: string
  }) => http.post<SuccessResponse<CartItem>>(`${DeliveryCartUrl}/add`, data)
}

export default ShoppingCartApi
