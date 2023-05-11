import { Link } from 'react-router-dom'

import ProductRating from 'src/components/ProductRating'
import { path } from 'src/constants/path'

import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'

interface Props {
  product: ProductType
}

function Product({ product }: Props) {
  return (
    <Link to={`/${generateNameId({ name: product.name, id: product.id })}`}>
      <div className='border-1 overflow-hidden rounded-sm border border-solid border-gray-300 bg-white shadow transition-transform duration-100 hover:translate-y-[-0.5rem] hover:border-orange hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={`${path.image}/${product.imageName}`}
            className='absolute left-0 top-0 h-full w-full bg-white object-cover'
            alt={product.name}
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{product.name}</div>
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
