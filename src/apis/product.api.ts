import { ImageResponse, ProductResponse } from 'src/types/auth.type'
import { Product, ProductListConfig } from 'src/types/product.type'
import { ResProductPageApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/Products'
const productApi = {
  addProductApi: (body: Product) => http.post<ProductResponse>(`${URL}/add`, body),

  addImageApi: (body: FormData) => http.post<ImageResponse>('/FileUpload', body),
  getAllProduct(params: ProductListConfig) {
    return http.get<ResProductPageApi>(URL, { params })
  },
  getDetailProduct(id: number) {
    return http.get<Product>(`${URL}/${id}`)
  },
  deleteProduct(id: number) {
    return http.delete<Product>(`${URL}/${id}`)
  },
  updateProduct(id: number, body: Product) {
    return http.put<Product>(`${URL}/${id}`, body)
  }
}
export default productApi
