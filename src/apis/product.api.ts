import { ImageResponse, ProductResponse } from 'src/types/auth.type'
import { Addproduct, Product, ProductListConfig, addProductRequest } from 'src/types/product.type'
import { ResProductPageApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/Products'
const productApi = {
  addImageApi: (body: FormData) => http.post<ImageResponse>('/FileUpload', body),
  getAllProduct(params?: ProductListConfig) {
    return http.get<ResProductPageApi>(URL, { params })
  },
  getDetailProduct(id: string) {
    return http.get<Product>(`${URL}/${id}`)
  },

  updateProduct(id: number, body: Product) {
    return http.put<Product>(`${URL}/${id}`, body)
  }
}
export default productApi
