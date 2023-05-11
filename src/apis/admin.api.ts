import { Category } from 'src/types/category.type'
import { Addproduct, Product } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
const urlProducts = '/Products'
const urlUser = '/User'
const urlCategory = '/category'
const adminApi = {
  deleteProduct: (data: { productIds: number[] }) =>
    http.delete<SuccessResponse<Product>>(`${urlProducts}/delete`, { data }),
  addProductApi: (id: number, product: Addproduct) =>
    http.post<SuccessResponse<Product>>(`${urlProducts}/add/${id}`, product),
  getProduct: (id?: number) => http.get<SuccessResponse<Product>>(`${urlProducts}/${id}`),
  updateProduct: (id: number, updatedProduct: Addproduct) =>
    http.put<SuccessResponse<Product>>(`${urlProducts}/update/${id}`, updatedProduct),
  getAllUser: () => http.get<SuccessResponse<User[]>>(`${urlUser}/Admin/getAllUser`),
  getAllCategory: () => http.get<SuccessResponse<Category[]>>(`${urlCategory}`),
  addCategory: (name: string) => http.post<SuccessResponse<Category>>(`${urlCategory}/add/${name}`),
  delateCategory: (data: { categoryIds: number[] }) =>
    http.delete<SuccessResponse<Category>>(`${urlCategory}/delete`, { data })
}
export default adminApi
