import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { ProductSchema } from 'src/utils/rule'
import { Button, Dialog, Card, CardBody, DialogHeader, DialogFooter } from '@material-tailwind/react'
import Input from '../Input'
import { Addproduct, UpdateModalPreload } from 'src/types/product.type'
import { QueryObserverResult, RefetchOptions, useMutation, useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import categoryApi from 'src/apis/category.api'
import adminApi from 'src/apis/admin.api'
import { useEffect, useState } from 'react'

const registerSchema = ProductSchema
interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetchData: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, unknown>>
  preloadedValues: UpdateModalPreload
  productId: number
  categoryId: number
}
type FormProductHaveImage = Addproduct
function UpdateModal({ open, setOpen, refetchData, preloadedValues, productId, categoryId }: Props) {
  const { name, price, description, discount_Price, view, rating, sold, quantity } = preloadedValues
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormProductHaveImage>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: name,
      description: description,
      price: price,
      discount_Price: discount_Price,
      rating: rating,
      view: view,
      sold: sold,
      quantity: quantity,
      imageName: '',
      image: undefined
    }
  })

  const addProductMutation = useMutation((params: { id: number; product: Addproduct }) => {
    return adminApi.addProductApi(params.id, params.product)
  })
  const updateProductMutation = useMutation((params: { id: number; updateProduct: Addproduct }) => {
    return adminApi.updateProduct(params.id, params.updateProduct)
  })
  const addImageMutation = useMutation({
    mutationFn: (body: FormData) => productApi.addImageApi(body)
  })
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    formData.append('file', data?.image[0])

    try {
      if (data.image.length != 0) {
        const { data: dataImage } = await addImageMutation.mutateAsync(formData)
        data.imageName = dataImage.data
        const id = productId
        const updateProduct = data
        const { data: dataproduct } = await updateProductMutation.mutateAsync({ id, updateProduct })
        handleOpen()
        refetchData()
      } else {
        const id = productId
        const updateProduct = data
        const { data: dataproduct } = await updateProductMutation.mutateAsync({ id, updateProduct })
        handleOpen()
        refetchData()
      }
    } catch (error) {
      console.log(error)
    }
  })
  const handleOpen = () => setOpen((cur) => !cur)
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })
  return (
    <Dialog
      size='xs'
      open={open}
      handler={handleOpen}
      className='fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto bg-modal bg-opacity-50 '
    >
      <Card className='mx-auto w-full max-w-[24rem]'>
        <DialogHeader> Update Product</DialogHeader>
        <CardBody className='flex flex-col p-2'>
          <Input
            type='text'
            className='p-2'
            placeholder='name'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
          ></Input>
          <Input
            type='text'
            className='p-2'
            placeholder='description'
            name='description'
            register={register}
            errorMessage={errors.description?.message}
          ></Input>
          <Input
            type='number'
            className='p-2'
            placeholder='price'
            name='price'
            register={register}
            errorMessage={errors.price?.message}
          ></Input>
          <Input
            type='number'
            className='p-2'
            placeholder='discount_Price'
            name='discount_Price'
            register={register}
            errorMessage={errors.discount_Price?.message}
          ></Input>
          <Input
            type='number'
            className='p-2'
            placeholder='quantity'
            name='quantity'
            register={register}
            errorMessage={errors.quantity?.message}
          ></Input>
          <Input
            type='number'
            className='p-2'
            placeholder='rating'
            name='rating'
            register={register}
            errorMessage={errors.rating?.message}
          ></Input>
          <Input
            type='number'
            className='p-2'
            placeholder='sold'
            name='sold'
            register={register}
            errorMessage={errors.sold?.message}
          ></Input>
          <Input
            type='number'
            className='p-2'
            placeholder='view'
            name='view'
            register={register}
            errorMessage={errors.view?.message}
          ></Input>
          <span>Choose Category</span>
          <select
            className='w-full rounded-sm border border-gray-300 p-2 outline-none focus:border-gray-500 focus:shadow-sm'
            {...register('categoryid')}
          >
            {categoryData?.data.data.map((category, index) => {
              return (
                <option key={index} value={category.id} selected={category.id === categoryId}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <Input
            type='file'
            className='mt-2'
            placeholder='image'
            name='image'
            register={register}
            errorMessage={errors.image?.message}
          ></Input>
        </CardBody>
        <DialogFooter>
          <Button variant='text' onClick={handleOpen} className='mr-1 rounded-lg bg-red-400 text-white'>
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' onClick={onSubmit} className='bg-blue-600'>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Card>
    </Dialog>
  )
}

export default UpdateModal
