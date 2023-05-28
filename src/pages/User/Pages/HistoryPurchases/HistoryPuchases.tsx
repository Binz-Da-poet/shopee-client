import React, { useContext } from 'react'
import { useQuery } from 'react-query'

import ShoppingCartApi from 'src/apis/shoppingCart.api'
import { path } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel, Avatar, Card, Typography } from '@material-tailwind/react'

import { ShoppingCartIcon, ClipboardDocumentCheckIcon, Square3Stack3DIcon } from '@heroicons/react/24/solid'

import { formatCurrency } from 'src/utils/utils'

const TABLE_HEAD = ['Sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền']
function HistoryPuchases() {
  const { profile } = useContext(AppContext)
  const ShoppingCartId = profile?.shoppingCart.id
  const { data: dataShoppingCart } = useQuery({
    queryKey: ['shoppingCart'],
    queryFn: () => ShoppingCartApi.getShoppingCart(ShoppingCartId)
  })
  const CartItemsData = dataShoppingCart?.data
  console.log(CartItemsData)
  const data = [
    {
      label: 'Tất cả',
      value: 'dashboard',
      icon: Square3Stack3DIcon,
      desc: (
        <Card className='h-full w-full '>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CartItemsData?.cartItems?.map(({ product, quantity }, index) => {
                const isLast = index === CartItemsData?.cartItems?.length && CartItemsData?.cartItems?.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={`${path.image}/${product.imageName}`} alt='avatar' variant='rounded' />
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {product.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        ₫{formatCurrency(product.discount_Price)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                        ₫{formatCurrency(product.discount_Price * quantity)}
                      </Typography>
                    </td>
                  </tr>
                )
              })}
              {CartItemsData?.deliveryCarts?.map(({ product, quantity }, index) => {
                const isLast =
                  index === CartItemsData?.deliveryCarts?.length && CartItemsData?.deliveryCarts?.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={`${path.image}/${product.imageName}`} alt='avatar' variant='rounded' />
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {product.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        ₫{formatCurrency(product.discount_Price)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                        ₫{formatCurrency(product.discount_Price * quantity)}
                      </Typography>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )
    },
    {
      label: 'Đang chờ thanh toán',
      value: 'profile',
      icon: ShoppingCartIcon,
      desc: (
        <Card className='h-full w-full '>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CartItemsData?.cartItems?.map(({ product, quantity }, index) => {
                const isLast = index === CartItemsData?.cartItems?.length && CartItemsData?.cartItems?.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={`${path.image}/${product.imageName}`} alt='avatar' variant='rounded' />
                        <Typography variant='small' color='blue-gray' className='font-normal'>
                          {product.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        ₫{formatCurrency(product.discount_Price)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                        ₫{formatCurrency(product.discount_Price * quantity)}
                      </Typography>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )
    },
    {
      label: 'Đang giao',
      value: 'settings',
      icon: ClipboardDocumentCheckIcon,
      desc: (
        <Card className='h-full w-full '>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography variant='small' color='blue-gray' className='font-normal leading-none opacity-70'>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CartItemsData?.deliveryCarts?.map(({ product, quantity, address, fullName, phoneNumber }, index) => {
                const isLast =
                  index === CartItemsData?.deliveryCarts?.length && CartItemsData?.deliveryCarts?.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className='flex  flex-col  gap-3'>
                        <div className='flex'>
                          <Avatar src={`${path.image}/${product.imageName}`} alt='avatar' variant='rounded' />
                          <Typography variant='h5' color='blue-gray' className='flex items-center pl-2 font-normal'>
                            {product.name}
                          </Typography>
                        </div>
                        <Typography variant='small' color='blue-gray' className='font-normal opacity-90'>
                          Người nhận : {fullName}
                        </Typography>
                        <Typography variant='small' color='blue-gray' className='font-normal opacity-90'>
                          Địa chỉ : {address}
                        </Typography>
                        <Typography variant='small' color='blue-gray' className='font-normal opacity-90'>
                          Số điện thoại : {phoneNumber}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        ₫{formatCurrency(product.discount_Price)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                        ₫{formatCurrency(product.discount_Price * quantity)}
                      </Typography>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )
    }
  ]

  return (
    <div className=''>
      <Tabs value='dashboard'>
        <TabsHeader style={{ zIndex: 0 }}>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className='flex items-center gap-2'>
                {React.createElement(icon, { className: 'w-5 h-5' })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody style={{ zIndex: 0 }}>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  )
}

export default HistoryPuchases
