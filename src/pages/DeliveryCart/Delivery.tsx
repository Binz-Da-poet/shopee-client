import { Button } from '@material-tailwind/react/components/Button'
import { useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ShoppingCartApi from 'src/apis/shoppingCart.api'
import AddDialog from 'src/components/AddDialog'
import UpdateDialog from 'src/components/UpdateDialog'
import { path } from 'src/constants/path'
import { PayPurchases } from 'src/types/DeliveryCart.type'
import { getPayPurchasesFromLS } from 'src/utils/auth'
import { formatCurrency } from 'src/utils/utils'

/* eslint-disable react/no-unescaped-entities */
function DeliveryCart() {
  const [open, setOpen] = useState(false)
  const data: PayPurchases = getPayPurchasesFromLS()
  const { data: PayPurchases } = useQuery({
    queryFn: () => ShoppingCartApi.getDelivery({ shoppingCartId: data.ShoppingCartId, productIds: data.purchaseIds })
  })

  const DataPayPurchases = PayPurchases?.data.data

  const totalCheckedPurchasesPrice = useMemo(
    () =>
      DataPayPurchases?.reduce((result, current) => {
        return result + current.product.discount_Price * current.quantity
      }, 0),
    [DataPayPurchases]
  )
  const addDeliveryCartMutation = useMutation({
    mutationFn: ShoppingCartApi.addDeliveryCart,
    onSuccess: (data) => {
      console.log(data)
    }
  })
  const navigate = useNavigate()
  const onSubmit = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: Data } = await addDeliveryCartMutation.mutateAsync({
        productIds: data.purchaseIds,
        shoppingCartId: data.ShoppingCartId,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address
      })
      console.log(Data)
      toast.success('Đặt Hàng Thành Công')
      navigate(path.historyPuchases)
    } catch (error) {
      console.log(error)
    }
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <div className='bg-cartbg  py-5'>
      <div className='container'>
        <div className='vtrWey bg-repeat-linear bg-pattern bg-gradient-stops-blue h-128 w-full bg-gradient-to-r'></div>
        <div className='bg-white px-8 pt-7 pb-6 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex-grow-1 flex-shrink-1 mb-5 flex basis-auto items-center text-lg capitalize text-orange'>
              <div className='mr-3 flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-4 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
              </div>
              <div>Địa Chỉ Nhận Hàng</div>
            </div>
          </div>

          <div className='flex items-center'>
            <div>
              <div className='flex items-center break-words text-base'>
                <div className='font-bold text-black'>{`${data.fullName}${'  '} (+81)${data.phoneNumber} `}</div>
                <div className='ml-5 break-words'>{data.address}</div>
                <div className='ml-6 flex-shrink-0 rounded-sm border border-solid border-orange py-1 px-2 text-xs capitalize text-orange'>
                  Mặc định
                </div>
              </div>
            </div>
            <button className='ml-10 cursor-pointer capitalize text-blue-600' onClick={handleOpen}>
              Thay đổi
            </button>
          </div>
        </div>

        <div className='mt-3 rounded shadow-sm'>
          <div className='flex h-12 items-center rounded bg-white px-8 pt-6 shadow-sm'>
            <div className='items-centerh-8 flex w-full text-sm text-gray-500'>
              <div className='flex-shrink flex-grow-4 basis-0 text-left'>
                <div className='flex items-center text-lg text-black'>Sản Phẩm</div>
              </div>
              <div className='flex-shrink flex-grow-2 basis-0 text-center'></div>
              <div className='flex-1 text-center'>Đơn giá</div>
              <div className='flex-1 text-center'>Số lượng</div>
              <div className='flex flex-shrink flex-grow-2 basis-0 justify-end text-center'>Thành tiền</div>
            </div>
          </div>

          <div>
            <div className='rounded bg-white pt-5 shadow-sm'>
              <div>
                <div className='relative rounded bg-white shadow-sm'>
                  {DataPayPurchases?.map((cartItem, index) => (
                    <div key={index} className='m-auto items-center border-b py-3'>
                      <div className='my-0 mx-8 flex min-h-fit overflow-hidden text-ellipsis text-sm text-black'>
                        <div className='flex flex-shrink flex-grow-4 basis-0 items-center justify-start overflow-hidden text-ellipsis '>
                          <img
                            src={`${path.image}/${cartItem.product.imageName}`}
                            alt=''
                            className='h-10 w-10 border-0'
                          />
                          <span className='my-0 mx-4 flex-col justify-center overflow-hidden'>
                            <span className='my-0 mx-8 flex overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black'>
                              {cartItem.product.name}
                            </span>
                          </span>
                        </div>
                        <div className='flex flex-shrink flex-grow-2 basis-0 items-center justify-start overflow-hidden text-ellipsis text-gray-500'>
                          <span></span>
                        </div>
                        <div className='flex flex-1 items-center justify-center overflow-hidden text-ellipsis'>
                          ₫{formatCurrency(cartItem.product.discount_Price)}
                        </div>
                        <div className='flex flex-1 items-center justify-center overflow-hidden text-ellipsis'>
                          {cartItem.quantity}
                        </div>
                        <div className='flex flex-shrink flex-grow-2 basis-0 items-center justify-end overflow-hidden text-ellipsis'>
                          ₫{formatCurrency(cartItem.product.discount_Price * cartItem.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='flex min-h-0 min-w-0 flex-col border-b py-5 px-8'>
                    <div className='flex'>
                      <div className='flex flex-shrink flex-grow-6 basis-0 items-center justify-end'>
                        <div className='flex items-center text-sm'>
                          <svg fill='red' viewBox='0 -2 23 22' className='mr-1 h-full w-6'>
                            <g filter='url(#voucher-filter0_d)'>
                              <mask id='a' fill='#fff'>
                                <path
                                  fillRule='evenodd'
                                  clipRule='evenodd'
                                  d='M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z'
                                ></path>
                              </mask>
                              <path
                                d='M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z'
                                mask='url(#a)'
                              ></path>
                            </g>
                            <path
                              clipRule='evenodd'
                              d='M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z'
                            ></path>
                            <defs>
                              <filter
                                id='voucher-filter0_d'
                                x='0'
                                y='1'
                                width='20'
                                height='16'
                                filterUnits='userSpaceOnUse'
                                colorInterpolationFilters='sRGB'
                              >
                                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                                <feColorMatrix
                                  in='SourceAlpha'
                                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                                ></feColorMatrix>
                                <feOffset></feOffset>
                                <feGaussianBlur stdDeviation='.5'></feGaussianBlur>
                                <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0'></feColorMatrix>
                                <feBlend in2='BackgroundImageFix' result='effect1_dropShadow'></feBlend>
                                <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape'></feBlend>
                              </filter>
                            </defs>
                          </svg>
                          <div className='text-sm'>Voucher của Shop</div>
                        </div>
                      </div>
                      <div className='flex flex-shrink flex-grow-4 basis-0 items-center justify-end'>
                        <div>
                          <div>
                            <button className='float-right cursor-pointer appearance-none border-0 p-0 text-sm font-medium text-blue-600 shadow-none'>
                              <span className='capitalize'>Chọn Voucher</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col bg-white pt-4 pr-7 pb-5 pl-7'>
                    <div className='flex items-center justify-end'>
                      <div className='text-sm text-gray-600'>{`Tổng số tiền ( ${DataPayPurchases?.length} sản phẩm )`}</div>
                      <div className='ml-5 text-xl text-orange'>
                        {' '}
                        ₫{formatCurrency(totalCheckedPurchasesPrice as number)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-3 rounded shadow'>
          <div className='mt-5 bg-white'>
            <div className='box-border flex items-center py-7 px-8 pl-8 '>
              <div className='w-52 flex-1 text-lg text-black'>Phương thức thanh toán</div>
              <div className='text-sm text-black'>Thanh toán khi nhận hàng</div>
              <div className='ml-16 cursor-pointer font-medium uppercase text-blue-600'>Thay đổi</div>
            </div>
          </div>
          <div className='grid grid-cols-12 grid-rows-4 gap-3 border-t border-solid border-gray-300 bg-white pt-4 shadow-sm '>
            <div className='col-span-2 col-start-9 col-end-11 flex justify-end text-sm text-gray-600'>
              Tổng tiền hàng
            </div>
            <div className='col-span-2 col-end-13 flex justify-end pr-6 pl-3 text-sm text-gray-600'>
              {' '}
              ₫{formatCurrency(totalCheckedPurchasesPrice as number)}
            </div>
            <div className='col-span-2 col-start-9 col-end-11 row-start-2 flex justify-end text-sm text-gray-600'>
              Vouchour
            </div>
            <div className='col-span-2 col-end-13 row-start-2 flex justify-end  pr-6 pl-3 text-sm text-gray-600'>
              -₫165.000
            </div>
            <div className='col-span-2 col-start-9 col-end-11 row-start-3 flex justify-end pt-3 text-sm text-gray-600'>
              Tổng thanh toán :
            </div>
            <div className='col-span-2 col-end-13 row-start-3 flex justify-end pt-2  pr-6 pl-3 text-2xl text-orange'>
              ₫{formatCurrency((totalCheckedPurchasesPrice as number) - 165000)}
            </div>
          </div>
          <div className='grid grid-cols-12 border-t bg-white '>
            <div className=' col-span-7 flex flex-1 pt-10 pr-6 pb-8 pl-4'>
              <div className='bg-white py-0 px-4 text-sm'>Nhấn 'Đặt hàng' đồng nghĩa với việc bạn đồng ý tuân theo</div>
              <a href='/' className='cursor-pointer text-blue-600'>
                Điều khoản Shopee
              </a>
            </div>
            <div className='col-span-3 col-start-10 flex flex-1  '>
              <Button className='m-auto w-4/5 bg-orange text-xl text-white' onClick={onSubmit}>
                Đặt hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <UpdateDialog
          open={open}
          setOpen={setOpen}
          purchaseIds={data.purchaseIds}
          shoppingCartId={data.ShoppingCartId}
          phoneNumber={data.phoneNumber}
          fullName={data.fullName}
          address={data.address}
        ></UpdateDialog>
      ) : (
        <></>
      )}
    </div>
  )
}

export default DeliveryCart
