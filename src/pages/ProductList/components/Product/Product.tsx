import { Link } from 'react-router-dom'

import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
  product: ProductType
}

function Product({ product }: Props) {
  const URL = 'http://localhost:8080/api/v1/auth/FileUpload/files'

  return (
    <Link to='/'>
      <div className='border-1 overflow-hidden rounded-sm border border-solid border-gray-300 bg-white shadow transition-transform duration-100 hover:translate-y-[-0.5rem] hover:border-orange hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={`${URL}/${product.imageName}`}
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
            alt={product.name}
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
            <div className=' ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'> {formatCurrency(product.discount_Price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
