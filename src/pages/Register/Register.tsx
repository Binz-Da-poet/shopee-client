import { yupResolver } from '@hookform/resolvers/yup'
import { t } from 'i18next'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import ShoppingCartApi from 'src/apis/shoppingCart.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseForm } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rule'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
type FormData = Schema
const registerSchema = schema.pick(['email', 'password', 'fullName', 'address', 'phoneNumber'])
function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  })
  const shoppingCartMutation = useMutation({
    mutationFn: (id: number) => ShoppingCartApi.createCart(id)
  })
  const LoginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data: FormData) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (dataUser) => {
        shoppingCartMutation.mutate(dataUser.data.user.userId, {
          onSuccess: () => {
            LoginMutation.mutate(data, {
              onSuccess: (dataLogin) => {
                console.log(dataLogin)
                setProfile(dataLogin.data.user)
                setIsAuthenticated(true)
              }
            })
          }
        })
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
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 bg-bg-login bg-contain  bg-center bg-no-repeat py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-xl' onSubmit={onSubmit}>
              <div className='text-2xl'>{t('登録')}</div>
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
                placeholder='Full Name'
                name='fullName'
                register={register}
                errorMessage={errors.fullName?.message}
              ></Input>
              <Input
                type='text'
                className='mt-2'
                placeholder='Address'
                name='address'
                register={register}
                errorMessage={errors.address?.message}
              ></Input>
              <Input
                type='text'
                className='mt-2'
                placeholder='Phone Number'
                name='phoneNumber'
                register={register}
                errorMessage={errors.phoneNumber?.message}
              ></Input>

              <div className='mt-2'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  {t('登録')}
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-300'>Bạn đã có tài khoản</span>
                  <Link className='ml-2 text-red-400' to='/login'>
                    {t('ログイン')}
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
