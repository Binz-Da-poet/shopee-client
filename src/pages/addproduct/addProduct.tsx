import { useForm } from 'react-hook-form'
import { Addproduct, Product } from 'src/types/product.type'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { useMutation } from 'react-query'

import productApi from 'src/apis/product.api'
import { getAccessTokenFromLS, setAccessTokenToLS } from 'src/utils/auth'

type FormProductHaveImage = Addproduct
type FormProduct = Product

function AddProduct() {
  const accessToken = getAccessTokenFromLS()
  setAccessTokenToLS(accessToken)
  const { register, handleSubmit } = useForm<FormProductHaveImage>()
  const addProductMutation = useMutation({
    mutationFn: (body: FormProduct) => productApi.addProductApi(body)
  })
  const addImageMutation = useMutation({
    mutationFn: (body: FormData) => productApi.addImageApi(body)
  })
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData()
    formData.append('file', data.image[0])
    console.log(data.image[0])

    addImageMutation.mutate(formData, {
      onSuccess: (dataImage) => {
        data.imageName = dataImage.data.data
        addProductMutation.mutate(data, {
          onSuccess: (data) => {
            console.log(data)
            alert('add thanh công')
          }
        })
      },
      onError: (error) => {
        console.log(error)
      }
    })
  })
  return (
    <div className='bg-login '>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 bg-bg-login bg-contain  bg-center bg-no-repeat py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-xl' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Add product</div>

              <Input type='text' className='mt-2' placeholder='name' name='name' register={register}></Input>
              <Input type='number' className='mt-2' placeholder='price' name='price' register={register}></Input>
              <Input
                type='number'
                className='mt-2'
                placeholder='discount_Price'
                name='discount_Price'
                register={register}
              ></Input>
              <Input type='number' className='mt-2' placeholder='rating' name='rating' register={register}></Input>
              <Input type='number' className='mt-2' placeholder='sold' name='sold' register={register}></Input>
              <Input type='number' className='mt-2' placeholder='quantity' name='quantity' register={register}></Input>

              <Input type='number' className='mt-2' placeholder='view' name='view' register={register}></Input>
              <Input
                type='text'
                className='mt-2'
                placeholder='description'
                name='description'
                register={register}
              ></Input>
              <Input type='file' className='mt-2' placeholder='image' name='image' register={register}></Input>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={addProductMutation.isLoading}
                  disabled={addProductMutation.isLoading}
                >
                  thêm product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
