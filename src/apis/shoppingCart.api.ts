import { CartItem } from 'src/types/CartItem.type'
import { AddCartItemRequest, shoppingCart } from 'src/types/shoppingCart.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const ShoppingCartURL = '/shopping-carts'
const CartItemURL = '/CartItem'
const ShoppingCartApi = {
  createCart: (id: number) => http.post<SuccessResponse<shoppingCart>>(`${ShoppingCartURL}/addShoppingCart`, id),
  addCartItem: (body: AddCartItemRequest) => http.post<SuccessResponse<CartItem>>(`${CartItemURL}/add`, body),
  getShoppingCart: (body: number | undefined) => http.post<shoppingCart>(`${ShoppingCartURL}/shoppingCart`, body),
  updateCartItem: (body: AddCartItemRequest) => http.put<SuccessResponse<CartItem>>(`${CartItemURL}/update`, body),
  deleteCartItem: (data: AddCartItemRequest) =>
    http.delete<SuccessResponse<CartItem>>(`${CartItemURL}/delete`, { data }),
  deleteManyCartItems: (data: { productIds: number[]; shoppingCartId?: number }) =>
    http.delete<SuccessResponse<CartItem>>(`${CartItemURL}/deleteMany`, { data })
}

export default ShoppingCartApi
