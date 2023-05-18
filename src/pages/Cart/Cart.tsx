import { Fragment, useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useLocation } from 'react-router-dom'
import ShoppingCartApi from 'src/apis/shoppingCart.api'
import { AppContext } from 'src/contexts/app.context'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import noproduct from 'src/assets/no-product.png'
import { CartItem } from 'src/types/CartItem.type'
import { produce } from 'immer'
import QuantityController from 'src/components/QuantityController'

import { keyBy } from 'lodash'
import { path } from 'src/constants/path'
function Cart() {
  const { extendedPurCharses, setExtendedPurchases } = useContext(AppContext)
  const { profile, isAuthenticated } = useContext(AppContext)
  const ShoppingCartId = profile?.shoppingCart.id
  const { data: dataShoppingCart, refetch } = useQuery({
    queryKey: ['shoppingCart', { status: 'In Cart' }],
    queryFn: () => ShoppingCartApi.getCartItemByStatus({ status: 1, shoppingCartId: ShoppingCartId }),
    enabled: isAuthenticated
  })

  const ShoppingCartItems = dataShoppingCart?.data.data
  const isAllChecked = useMemo(() => extendedPurCharses.every((purchars) => purchars.checked), [extendedPurCharses])
  const CheckedPurchases = useMemo(
    () => extendedPurCharses.filter((purchases) => purchases.checked),
    [extendedPurCharses]
  )
  const totalCheckedPurchasesPrice = useMemo(
    () =>
      CheckedPurchases.reduce((result, current) => {
        return result + current.product.discount_Price * current.quantity
      }, 0),
    [CheckedPurchases]
  )

  const totalCheckedPurchasesSavePrice = useMemo(
    () =>
      CheckedPurchases.reduce((result, current) => {
        return result + current.product.price - current.product.discount_Price * current.quantity
      }, 0),
    [CheckedPurchases]
  )

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const updatePurchaseMutation = useMutation({
    mutationFn: ShoppingCartApi.updateCartItem,
    onSuccess: () => {
      refetch()
    }
  })
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurCharses[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({
        productId: purchase.product.id,
        shoppingCartId: profile?.shoppingCart.id,
        quantity: value,
        status: 1
      })
    }
  }

  const handleChangeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].quantity = value
      })
    )
  }
  const deletePurchasesMutation = useMutation({
    mutationFn: ShoppingCartApi.deleteCartItem,
    onSuccess: () => {
      refetch()
    }
  })
  const deleteManyPurchasesMutation = useMutation({
    mutationFn: ShoppingCartApi.deleteManyCartItems,
    onSuccess: () => {
      refetch()
    }
  })
  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurCharses[purchaseIndex].product.id
    deletePurchasesMutation.mutate({
      status: 1,
      productId: purchaseId,
      shoppingCartId: profile?.shoppingCart.id
    })
  }
  const handleDeleteManyPurchases = () => {
    const purchaseIds = CheckedPurchases.map((purchase) => purchase.product.id)
    deleteManyPurchasesMutation.mutate({
      productIds: purchaseIds,
      shoppingCartId: profile?.shoppingCart.id,
      status: 1
    })
  }
  const updateStatusMutation = useMutation({
    mutationFn: ShoppingCartApi.updateCartItemStatus,
    onSuccess: () => {
      refetch()
    }
  })
  const handleBuyCartItems = () => {
    const purchaseIds = CheckedPurchases.map((purchase) => purchase.product.id)
    updateStatusMutation.mutate({
      productIds: purchaseIds,
      status: 2,
      shoppingCartId: profile?.shoppingCart.id
    })
  }
  const location = useLocation()
  const chooseCartItemId = (location.state as { CartItemId: number } | null)?.CartItemId

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, 'id')
      return (
        ShoppingCartItems?.map((purchase) => {
          const ischoosenCartItemId = chooseCartItemId === purchase.id
          return {
            ...purchase,
            disabled: false,
            checked: ischoosenCartItemId || Boolean(extendedPurchasesObject[purchase.id]?.checked)
          }
        }) || []
      )
    })
  }, [ShoppingCartItems, chooseCartItemId, setExtendedPurchases])
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='lg container 2xl:ml-20'>
        {extendedPurCharses && extendedPurCharses.length > 0 ? (
          <Fragment>
            <div className='overflow-auto'>
              <div className='min-w-[1000px] '>
                <div className='test-sm grid grid-cols-12 rounded-sm bg-white px-9 py-5 capitalize text-gray-500 shadow'>
                  <div className='col-span-6 '>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurCharses.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurCharses?.map((purchase, index) => (
                      <div
                        key={purchase.id}
                        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  className='h-20 w-20 flex-shrink-0'
                                  to={`/${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product.id
                                  })}`}
                                >
                                  <img
                                    src={`${path.image}/${purchase.product.imageName}`}
                                    alt={purchase.product.name}
                                  />
                                </Link>
                                <div className='flex-grow px-2 pb-2 pt-1'>
                                  <Link
                                    to={`/${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product.id
                                    })}`}
                                    className='line-clamp-2 text-left'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price)}
                                </span>
                                <span className='ml-3'>₫{formatCurrency(purchase.product.discount_Price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.quantity}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleChangeQuantity(index)}
                                onFocusOut={(value) => {
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (ShoppingCartItems as CartItem[])[index].quantity
                                  )
                                }}
                                disabled={purchase.disabled}
                              />
                            </div>

                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.product.discount_Price * purchase.quantity)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                onClick={handleDelete(index)}
                                className='bg-none text-black transition-colors hover:text-orange'
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center '>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                  Chọn tất cả ({extendedPurCharses.length})
                </button>
                <button onClick={handleDeleteManyPurchases} className='mx-3 border-none bg-none'>
                  Xóa
                </button>
              </div>

              <div className='ml-auto mt-5 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
                <div>
                  <div className='flex items-center sm:justify-end'>
                    <div>Tổng thanh toán({CheckedPurchases.length} sản phẩm)</div>
                    <div className='ml-2 text-2xl text-orange'> ₫{formatCurrency(totalCheckedPurchasesPrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchasesSavePrice)}</div>
                  </div>
                </div>
                <button
                  onClick={handleBuyCartItems}
                  className='ml-4 mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:mt-0'
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </Fragment>
        ) : (
          <div className='text-center'>
            <img src={noproduct} alt='no purchases' className='mx-auto h-24 w-24' />
            <div className='my-5 font-bold text-gray-500'>Chưa có sản phẩm nào trong giỏ hàng</div>
            <div className='text-center'>
              <Link
                to='/'
                className='rounded-sm bg-orange px-10 py-2 uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
