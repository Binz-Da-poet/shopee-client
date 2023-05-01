import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import ProductRating from 'src/components/ProductRating'
import { path } from 'src/constants/path'
import useQueryConfig from 'src/hook/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

function AdminProducts() {
  const queryConfig = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['Adminproducts', queryConfig],
    queryFn: () => {
      return productApi.getAllProduct(queryConfig as ProductListConfig)
    },

    staleTime: 3 * 60 * 1000
  })
  console.log(data)
  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between  border-b-2 border-b-black/10 pb-4 text-gray-900 '>
        <h2 className='text-2xl text-4xl font-bold leading-tight text-gray-900'>Products</h2>
        <p className='rounded bg-orange py-2 px-4 font-bold text-white '>Total : {data?.data.data.totalElements}</p>
        <button className='rounded-xl bg-blue-500 py-2 px-4 font-bold text-white'>+ Create Item</button>
      </div>
      <table className='w-full table-fixed'>
        <thead>
          <tr className='py-4 text-base font-thin text-gray-500 '>
            <th className='w-10 pr-10'></th>
            <th className='px-4 py-2 '>Product Name</th>
            <th className='px-4 py-2'>Image</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>discount Price</th>
            <th className='px-4 py-2'>quantity</th>
            <th className='px-4 py-2'>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.data.content.map((product, index) => (
            <tr key={index} className='text-sm font-thin'>
              <td className=' w-20'>
                <input type='checkbox' className='m-auto h-5 w-5 accent-orange' />
              </td>
              <td className='whitespace-pre-line border px-2'>{product.name}</td>

              <td className=' border px-2'>
                <img src={`${path.image}/${product.imageName}`} alt={product.name} className='m-auto h-16' />
              </td>
              <td className='border px-2 '>{formatCurrency(product.discount_Price)}</td>
              <td className='border px-2 '>{formatCurrency(product.discount_Price)}</td>
              <td className='border px-2 '>{formatNumberToSocialStyle(product.quantity)}</td>
              <td className='border px-2 '>
                <ProductRating rating={product.rating} />
              </td>
              <td className='border px-4 '>
                <Link to={`/`} className='text-blue-500'>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination queryConfig={queryConfig} pageSize={data?.data.data.totalPages ? data?.data.data.totalPages : 0} />
    </div>
  )
}

export default AdminProducts
