import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'

import { ErrorResponseForm } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rule'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
type FormData = Schema

function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data: FormData) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response?.data as ErrorResponseForm
          if (formError) {
            setError('email', {
              message: formError.message,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-login '>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='bg-bg-login bg-no-repeat bg-contain bg-center  grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-xl' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                type='text'
                className='mt-8'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              ></Input>
              <Input
                type='password'
                className='mt-2'
                placeholder='Password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              ></Input>
              <Input
                type='text'
                className='mt-2'
                placeholder='Họ Và Tên'
                name='fullName'
                register={register}
                errorMessage={errors.fullName?.message}
              ></Input>
              <Input
                type='text'
                className='mt-2'
                placeholder='Địa Chỉ'
                name='address'
                register={register}
                errorMessage={errors.address?.message}
              ></Input>
              <Input
                type='text'
                className='mt-2'
                placeholder='Số Điện thoại'
                name='phoneNumber'
                register={register}
                errorMessage={errors.phoneNumber?.message}
              ></Input>

              <div className='mt-2'>
                <Button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-300'>Bạn đã có tài khoản</span>
                  <Link className='text-red-400 ml-2' to='/login'>
                    Đăng Nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register