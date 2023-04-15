import { useQuery } from 'react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product/Product'
import SortProductList from './components/SortProductList'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hook/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'

function ProductList() {
  const queryConfig = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getAllProduct(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  console.log(data)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList
              queryConfig={queryConfig}
              pageSize={data?.data.data.totalPages ? data?.data.data.totalPages : 0}
            />
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data?.data?.data?.content?.map((content) => (
                <div key={content.id} className='col-span-1'>
                  <Product product={content} />
                </div>
              ))}
            </div>
            <Pagination
              queryConfig={queryConfig}
              pageSize={data?.data.data.totalPages ? data?.data.data.totalPages : 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
