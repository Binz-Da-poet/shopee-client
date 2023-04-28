import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rule'

import Button from 'src/components/Button'
import { useMutation } from 'react-query'
import UserApi from 'src/apis/user.api'
import { toast } from 'react-toastify'
import { ErrorResponseForm } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'password' | 'new_password' | 'confirm_password'>
const ChangePassWordForm = schema.pick(['password', 'new_password', 'confirm_password'])
function ChangePasswordPage() {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    resolver: yupResolver(ChangePassWordForm)
  })
  const ChangePassWordMutation = useMutation({
    mutationFn: (body: FormData) => UserApi.changePassword(body)
  })
  const onSubmit = handleSubmit((data) => {
    ChangePassWordMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data as ErrorResponseForm
          if (formError) {
            setError('password', {
              message: formError.message,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Thêm Mật Khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>
          Để bảo mật tài khoản,vui lòng không chỉa sẻ mật khẩu cho người khác
        </div>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-center'>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật Khẩu Củ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-1/2 rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='password'
                  errorMessage={errors.password?.message}
                  placeholder='Mật Khẩu Cũ'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'> Mật Khẩu mới</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-1/2 rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='new_password'
                  errorMessage={errors.new_password?.message}
                  placeholder='Mật Khẩu mới'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập Lại MK</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-1/2 rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='confirm_password'
                  errorMessage={errors.confirm_password?.message}
                  placeholder='Nhập Lại Mật Khẩu Mới'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  onClick={onSubmit}
                  className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordPage
