import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { ProductSchema } from 'src/utils/rule'
import { Button, Dialog, Card, CardBody, DialogHeader, DialogFooter } from '@material-tailwind/react'
import Input from '../Input'
import { Addproduct } from 'src/types/product.type'
import { QueryClient, QueryObserverResult, RefetchOptions, useMutation, useQuery, useQueryClient } from 'react-query'
import productApi from 'src/apis/product.api'
import categoryApi from 'src/apis/category.api'
import adminApi from 'src/apis/admin.api'
const registerSchema = ProductSchema
interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetchData: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, unknown>>
}
type FormProductHaveImage = Addproduct
function AddModal({ open, setOpen, refetchData }: Props) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormProductHaveImage>({
    resolver: yupResolver(registerSchema)
  })

  const addProductMutation = useMutation((params: { id: number; product: Addproduct }) => {
    return adminApi.addProductApi(params.id, params.product)
  })
  const addImageMutation = useMutation({
    mutationFn: (body: FormData) => productApi.addImageApi(body)
  })
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData()
    formData.append('file', data.image[0])

    try {
      const { data: dataImage } = await addImageMutation.mutateAsync(formData)
      data.imageName = dataImage.data
      const id = data.categoryid
      const product = data
      const { data: dataproduct } = await addProductMutation.mutateAsync(
        { id, product },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
          }
        }
      )
      handleOpen()
      refetchData()
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
    <Dialog size='xs' open={open} handler={handleOpen} className='fixed z-[1055] h-fit  '>
      <Card>
        <DialogHeader> Create Product</DialogHeader>
        <CardBody className='flex flex-col p-2'>
          <Input
            labelText='name'
            type='text'
            className='p-2'
            name='name'
            register={register}
            errorMessage={errors.name?.message}
          ></Input>
          <Input
            labelText='description'
            type='text'
            className='p-2'
            name='description'
            register={register}
            errorMessage={errors.description?.message}
          ></Input>
          <Input
            type='number'
            labelText='price'
            className='p-2'
            name='price'
            register={register}
            errorMessage={errors.price?.message}
          ></Input>
          <Input
            labelText='discount_Price'
            type='number'
            className='p-2'
            name='discount_Price'
            register={register}
            errorMessage={errors.discount_Price?.message}
          ></Input>
          <Input
            labelText='quantity'
            type='number'
            className='p-2'
            name='quantity'
            register={register}
            errorMessage={errors.quantity?.message}
          ></Input>
          <Input
            labelText='rating'
            type='number'
            className='p-2'
            name='rating'
            register={register}
            errorMessage={errors.rating?.message}
          ></Input>
          <Input
            labelText='sold'
            type='number'
            className='p-2'
            name='sold'
            register={register}
            errorMessage={errors.sold?.message}
          ></Input>
          <Input
            labelText='view'
            type='number'
            className='p-2'
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
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <Input
            labelText='image'
            type='file'
            className='mt-2'
            name='image'
            register={register}
            errorMessage={errors.image?.message}
          ></Input>
        </CardBody>
        <DialogFooter>
          <Button variant='gradient' color='red' onClick={handleOpen} className='mr-1 rounded-lg bg-red-400 text-white'>
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

export default AddModal
