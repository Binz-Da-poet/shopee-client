import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponseForm } from 'src/types/utils.type'
import { schema, LoginSchema } from 'src/utils/rule'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = LoginSchema

const loginSchema = schema.pick(['email', 'password'])

function Login() {
  const { setIsAdminRole, setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const LoginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  const onSubmit = handleSubmit((data: FormData) => {
    LoginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.user)
        if (data.data.user.role === 'ROLE_ADMIN') {
          setIsAdminRole(true)
        } else {
          setIsAdminRole(false)
        }
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
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 bg-bg-login bg-contain  bg-center bg-no-repeat py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-xl' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
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

              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-center text-sm uppercase text-white hover:bg-red-600'
                  isLoading={LoginMutation.isLoading}
                  disabled={LoginMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-300'>Bạn chưa có tài khoản</span>
                  <NavLink className='ml-2 text-red-400' to='/register'>
                    Đăng Ký
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
