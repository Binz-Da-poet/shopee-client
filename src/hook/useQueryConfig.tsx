import { omitBy, isUndefined } from 'lodash'
import useQueryParams from './useQueryParams'
import { ProductListConfig } from 'src/types/product.type'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '10',
      exclude: queryParams.exclude,
      order: queryParams.order,
      name: queryParams.name,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
      rating: queryParams.rating,
      sort_by: queryParams.sort_by,
      categoryId: queryParams.categoryId
    },
    isUndefined
  )
  return queryConfig
}

export default useQueryConfig
