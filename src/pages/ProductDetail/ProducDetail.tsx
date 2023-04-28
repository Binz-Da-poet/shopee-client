import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import QuantityController from 'src/components/QuantityController'
import DOMPurify from 'dompurify'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import ShoppingCartApi from 'src/apis/shoppingCart.api'
import { AppContext } from 'src/contexts/app.context'

import 'react-toastify/dist/ReactToastify.min.css'
import { toast } from 'react-toastify'
import { path } from 'src/constants/path'

const ProductDetail = () => {
  const queryClient = useQueryClient()
  const { profile } = useContext(AppContext)
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getDetailProduct(id as string)
    }
  })
  const navigate = useNavigate()
  const [buyCount, setBuyCount] = React.useState(1)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const product = productDetailData?.data
  const addToCartMutations = useMutation(ShoppingCartApi.addCartItem)
  const addToShoppingCart = () => {
    addToCartMutations.mutate(
      {
        quantity: buyCount,
        productId: product?.id,
        shoppingCartId: profile?.shoppingCarts[0].id,
        status: 1
      },
      {
        onSuccess: () => {
          toast.success('Đã Thêm Vào Giỏ Hàng')
          queryClient.invalidateQueries({ queryKey: ['shoppingCart', { status: 'In Cart' }] })
        }
      }
    )
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    const { offsetX, offsetY } = event.nativeEvent
    // đây là công thức để tính vị trí
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.height = naturalHeight + 'px'
    image.style.width = naturalWidth + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const BuyNow = async () => {
    const res = addToCartMutations.mutateAsync({
      quantity: buyCount,
      productId: product?.id,
      shoppingCartId: profile?.shoppingCarts[0].id,
      status: 1
    })
    const CartItem = (await res).data.data
    navigate(path.Cart, { state: { CartItemId: CartItem.id } })
  }
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container ml-20 '>
        <div className=' bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={`${path.image}/${product.imageName}`}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                  alt={product.name}
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1 '>
                <div className='relative col-start-3 mx-auto w-full pt-[100%]  '>
                  <img
                    src={`${path.image}/${product.imageName}`}
                    className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                    alt={product.name}
                  />
                  <div className='absolute inset-0 border-2 border-orange ' />
                </div>
              </div>
            </div>
            <div className='col-span-7 m-auto '>
              <h1 className='w-2/3 break-all text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                  <ProductRating
                    rating={product.rating}
                    activeClassName='h-4 w-4 fill-orange text-orange'
                    nonActiveClassName='fill-gray-300 text-gray-300 h-4 w-4'
                  />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price)}</div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatCurrency(product.discount_Price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price, product.discount_Price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500 '>Số lượng</div>
                <QuantityController
                  max={product.quantity}
                  onType={handleBuyCount}
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  value={buyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='items-cent mt-8 flex'>
                <button
                  onClick={addToShoppingCart}
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={BuyNow}
                  className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container ml-20'>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
