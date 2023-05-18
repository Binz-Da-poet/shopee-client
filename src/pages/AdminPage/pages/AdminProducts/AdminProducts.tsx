import { produce } from 'immer'
import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import adminApi from 'src/apis/admin.api'
import productApi from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import ProductRating from 'src/components/ProductRating'
import { path } from 'src/constants/path'
import useQueryConfig from 'src/hook/useQueryConfig'
import { ExtendedProduct, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import AddModal from '../../Components/AddModal'
import Button from 'src/components/Button'
import UpdateModal from '../../Components/UpdateModal'
import NotificationDialog from '../../Components/NotificationDialog/NotificationDialog'

function AdminProducts() {
  const queryClient = useQueryClient()
  const [openNotification, setOpenNotification] = useState(false)
  const [open, setOpen] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [productId, setProductId] = useState(0)
  const [categoryId, setCategoryId] = useState(0)
  const initialProductId = productId
  const handleOpen = () => setOpen((cur) => !cur)
  const handleOpenUpdateModal = () => setOpenUpdateModal((cur) => !cur)
  const [extendedProduct, setExtendedProduct] = useState<ExtendedProduct[]>([])

  const queryConfig = useQueryConfig()
  const { data, refetch } = useQuery({
    queryKey: ['Adminproducts', queryConfig],
    queryFn: () => {
      return productApi.getAllProduct(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const CheckedPurchases = extendedProduct.filter((product) => product.checked)
  const productIds = CheckedPurchases.map((product) => product.id)
  console.log(productIds[0])
  const dataProducts = data?.data.data.content
  const isAllChecked = extendedProduct.every((product) => product.checked)
  const deleteProduct = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      refetch()
    }
  })
  const findCartItems = useMutation({
    mutationFn: adminApi.findCartItemsByProduct
  })
  useEffect(() => {
    setExtendedProduct(
      dataProducts?.map((product) => ({
        ...product,
        checked: false
      })) || []
    )
  }, [dataProducts])
  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedProduct(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedProduct((prev) =>
      prev.map((prduct) => ({
        ...prduct,
        checked: !isAllChecked
      }))
    )
  }
  const handleDelete = () => {
    const productIds = CheckedPurchases.map((product) => product.id)
    console.log(productIds[0])
    findCartItems.mutate(
      {
        productId: productIds[0]
      },
      {
        onSuccess: (data) => {
          if (data.data.message == '1') {
            setOpenNotification(true)
          }
          if (data.data.message == '0') {
            deleteProduct.mutate(
              {
                productIds: productIds
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ['products'] })
                }
              }
            )
          }
        }
      }
    )
  }

  const [preloadedValues, setPreloadedValues] = useState({
    id: 0,
    name: '',
    description: '',
    price: 11110,
    discount_Price: 11110,
    quantity: 11110,
    rating: 11110,
    sold: 1110,
    view: 11110
  })

  useEffect(() => {
    if (productId !== 0) {
      const getProduct = async () => {
        const { data } = await adminApi.getProduct(productId)

        const product = data?.data

        if (product) {
          setPreloadedValues({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            discount_Price: product.discount_Price,
            quantity: product.quantity,
            rating: product.rating,
            sold: product.sold,
            view: product.view
          })
        }
      }
      getProduct()
    }
  }, [productId, initialProductId])
  // Define preloadedValues with initial values
  const handleClick = async (productId: number, category: number) => {
    setProductId(productId)
    setCategoryId(category)
    // Get the latest data for the selected product
    const { data } = await adminApi.getProduct(productId)
    const product = data?.data

    // Set the preloadedValues state with the latest data
    setPreloadedValues({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discount_Price: product.discount_Price,
      quantity: product.quantity,
      rating: product.rating,
      sold: product.sold,
      view: product.view
    })
    handleOpenUpdateModal()
  }
  return (
    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between  border-b-2 border-b-black/10 pb-4 text-gray-900 '>
        <h2 className=' text-4xl font-bold leading-tight text-gray-900'>Products</h2>
        <p className='rounded bg-orange px-4 py-2 font-bold text-white '>Total : {data?.data.data.totalElements}</p>
        <button className='rounded-xl bg-blue-500 px-4 py-2 font-bold text-white' onClick={handleOpen}>
          + Create Product
        </button>
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
          {extendedProduct?.map((product, index) => (
            <tr key={index} className='text-sm font-thin'>
              <td className=' w-20'>
                <input
                  type='checkbox'
                  className='m-auto h-5 w-5 accent-orange'
                  checked={product.checked}
                  onChange={handleCheck(index)}
                />
              </td>
              <td className='whitespace-pre-line border px-2'>{product.name}</td>

              <td className=' border px-2'>
                <img src={`${path.image}/${product.imageName}`} alt={product.name} className='m-auto h-16' />
              </td>
              <td className='border px-2 '>{formatCurrency(product.discount_Price)}</td>
              <td className='border px-2 '>{formatCurrency(product.discount_Price)}</td>
              <td className='border px-2 text-center'>{formatNumberToSocialStyle(product.quantity)}</td>
              <td className='m-auto border px-2 text-center'>
                <div className='flex items-center justify-center'>
                  <ProductRating rating={product.rating} />
                </div>
              </td>
              <td className=' border px-4 '>
                <Button className='text-blue-500' onClick={() => handleClick(product.id, product.category.id)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mt-6 flex items-center'>
        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
          <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll} />
        </div>
        <button className='mx-3 border-none bg-none ' onClick={handleCheckAll}>
          Chọn tất cả ({CheckedPurchases.length})
        </button>
        <Button className='rounded bg-orange px-4 py-2 font-bold text-white' onClick={handleDelete}>
          Xóa
        </Button>
      </div>
      <Pagination queryConfig={queryConfig} pageSize={data?.data.data.totalPages ? data?.data.data.totalPages : 0} />
      <>
        <AddModal open={open} setOpen={setOpen} refetchData={refetch}></AddModal>
      </>
      <>
        <NotificationDialog
          refetchData={refetch}
          open={openNotification}
          setOpen={setOpenNotification}
          CheckedPurchases={CheckedPurchases}
        ></NotificationDialog>
      </>
      {openUpdateModal ? (
        <UpdateModal
          open={openUpdateModal}
          setOpen={setOpenUpdateModal}
          refetchData={refetch}
          preloadedValues={preloadedValues}
          productId={productId}
          categoryId={categoryId}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default AdminProducts
