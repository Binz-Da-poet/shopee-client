import { ImageResponse } from 'src/types/auth.type'
import { Product, ProductListConfig } from 'src/types/product.type'
import { ResProductPageApi, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/Products'
const productApi = {
  addImageApi: (body: FormData) => http.post<ImageResponse>('/FileUpload', body),
  getAllProduct(params?: ProductListConfig) {
    return http.get<ResProductPageApi>(URL, { params })
  },
  getDetailProduct(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },

  updateProduct(id: number, body: Product) {
    return http.put<Product>(`${URL}/${id}`, body)
  }
}
export default productApi
