import { Category } from './category.type'

export interface Product {
  id: number
  imageName: string
  name: string
  price: number
  discount_Price: number
  rating: number
  sold: number
  quantity: number
  view: number
  description: string
  category?: Category
}

export interface ProductList {
  content: Array<Product>
  pageable: {
    pageNumber: number
    pageSize: number
  }
  totalPages: number
}
export interface ProductListConfig {
  page?: number
  limit?: number
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating?: number
  price_max?: number
  price_min?: number
  name?: string
  categoryId?: number
}

export interface Addproduct {
  id: number
  image: FileList
  imageName: string
  name: string
  price: number
  discount_Price: number
  rating: number
  sold: number
  quantity: number
  view: number

  description: string
  category: {
    id: number | null
  }
}
