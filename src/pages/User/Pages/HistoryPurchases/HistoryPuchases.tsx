import classNames from 'classnames'
import { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import ShoppingCartApi from 'src/apis/shoppingCart.api'
import { path } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

import useQueryParams from 'src/hook/useQueryParams'
import { CartItem } from 'src/types/CartItem.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

function HistoryPuchases() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number | '' = Number(queryParams.status) || ''
  const { profile } = useContext(AppContext)
  const ShoppingCartId = profile?.shoppingCart.id
  const { data: dataShoppingCart } = useQuery({
    queryKey: ['shoppingCart'],
    queryFn: () => ShoppingCartApi.getShoppingCart(ShoppingCartId)
  })
  const CartItemsData = dataShoppingCart?.data.cartItems

  return (
    <div className='h-full rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='sticky top-0 flex items-center rounded-t-sm shadow-sm'>
        <Link
          to={{
            pathname: path.historyPuchases,
            search: createSearchParams({
              status: '0'
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2', {
            'border-b-orange text-orange': status == 0,
            'border-b-black/10 text-gray-900': status !== 0
          })}
        >
          Tất cả
        </Link>
        <Link
          to={{
            pathname: path.historyPuchases,
            search: createSearchParams({
              status: '1'
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2', {
            'border-b-orange text-orange': status == 1,
            'border-b-black/10 text-gray-900': status !== 1
          })}
        >
          Chờ xác nhận
        </Link>
        <Link
          to={{
            pathname: path.historyPuchases,
            search: createSearchParams({
              status: '2'
            }).toString()
          }}
          className={classNames('flex flex-1 items-center justify-center border-b-2', {
            'border-b-orange text-orange': status === 2,
            'border-b-black/10 text-gray-900': status !== 2
          })}
        >
          Đang giao
        </Link>
      </div>
      <div>
        {CartItemsData && CartItemsData.length > 0 ? (
          status == 0 ? (
            CartItemsData.map((item: CartItem) => (
              <div key={item.id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({
                    name: item.product.name,
                    id: item.product.id
                  })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img
                      className='h-20 w-20 object-cover'
                      src={`${path.image}/${item.product.imageName}`}
                      alt={item.product.name}
                    />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{item.product.name}</div>
                    <div className='mt-3'>x{item.quantity}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>{formatCurrency(item.product.price)}</span>
                    <span className='ml-2 truncate text-orange '>{formatCurrency(item.product.discount_Price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      đ{formatCurrency(item.product.discount_Price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : CartItemsData.filter((item: CartItem) => item.status == status).length > 0 ? (
            CartItemsData.filter((item: CartItem) => item.status == status).map((item: CartItem) => (
              <div key={item.id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({
                    name: item.product.name,
                    id: item.product.id
                  })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img
                      className='h-20 w-20 object-cover'
                      src={`${path.image}/${item.product.imageName}`}
                      alt={item.product.name}
                    />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{item.product.name}</div>
                    <div className='mt-3'>x{item.quantity}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>{formatCurrency(item.product.price)}</span>
                    <span className='ml-2 truncate text-orange '>{formatCurrency(item.product.discount_Price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      đ{formatCurrency(item.product.discount_Price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div key='null' className='mt-20'>
              <div className='flex justify-center '>
                <img
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
                  alt='empty-cart'
                />
              </div>
              <div className='mt-4 text-center text-gray-800'>
                <p>Chưa có sản phẩm</p>
              </div>
            </div>
          )
        ) : (
          <div key='null' className='mt-20'>
            <div className='flex justify-center '>
              <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
                alt='empty-cart'
              />
            </div>
            <div className='mt-4 text-center text-gray-800'>
              <p>Giỏ hàng của bạn đang trống</p>
              <Link to={path.home} className='text-orange hover:underline'>
                Quay lại mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPuchases
