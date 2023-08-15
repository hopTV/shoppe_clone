export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  description: string
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
  }
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: string
  limit?: string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
  category?: string
}
