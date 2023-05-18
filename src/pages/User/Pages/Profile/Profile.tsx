import React, { useContext } from 'react'

import Button from 'src/components/Button'
import Input from 'src/components/Input'

import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'

import { AppContext } from 'src/contexts/app.context'
import { toast } from 'react-toastify'
import { UserSchema } from 'src/utils/rule'
import UserApi from 'src/apis/user.api'
import { useMutation, useQuery } from 'react-query'
import productApi from 'src/apis/product.api'
import { UpdateUser } from 'src/types/user.type'
import defaultAvatar from 'src/assets/avatarDefault.png'

import { setProfileToLS } from 'src/utils/auth'
import { path } from 'src/constants/path'

type FormDataUser = UpdateUser
const profileSchema = UserSchema.pick(['fullName', 'address', 'avatar', 'phoneNumber'])
const Profile = () => {
  const { setProfile, profile } = useContext(AppContext)
  const { refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: UserApi.getProfile
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormDataUser>({
    defaultValues: {
      fullName: '',
      address: '',
      phoneNumber: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const addImageMutation = useMutation({
    mutationFn: (body: FormData) => productApi.addImageApi(body)
  })
  const UpdateUser = useMutation({
    mutationFn: (body: UpdateUser) => UserApi.updateProfile(body)
  })

  const onSubmit = handleSubmit((data) => {
    if (data.Image.length == 0) {
      UpdateUser.mutate(data, {
        onSuccess: (data) => {
          setProfile(data.data.data)
          setProfileToLS(data.data.data)
          refetch()
          toast.success('update thanh cong')
        }
      })
    } else if (data.Image[0].size >= 1048576) {
      toast.error('Dung lượng file tối đa 1MB Và Định Dạng png, jpg, jpeg, bmp')
    } else {
      const formData = new FormData()
      formData.append('file', data.Image[0])
      addImageMutation.mutate(formData, {
        onSuccess: (dataImage) => {
          data.avatar = dataImage.data.data
          UpdateUser.mutate(data, {
            onSuccess: (data) => {
              setProfile(data.data.data)
              setProfileToLS(data.data.data)
              toast.success('update thanh cong')
            }
          })
        },
        onError: (error) => {
          console.log(error)
        }
      })
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-center'>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='fullName'
                  errorMessage={errors.fullName?.message}
                  placeholder={profile?.fullName}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Controller
                  control={control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                      errorMessage={errors.phoneNumber?.message}
                      placeholder={profile?.phoneNumber}
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='address'
                  placeholder={profile?.address}
                  errorMessage={errors.address?.message}
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
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={profile?.avatar ? `${path.image}/${profile.avatar}` : defaultAvatar}
                  alt=''
                  className='h-full w-full object-cover'
                />
              </div>
              <Input type='file' className='mt-2' placeholder='Image' name='Image' register={register}>
                Chọn ảnh
              </Input>

              <div className='mt-3 text-gray-400'>
                <div>Dung lượng file tối đa 1MB</div>
                <div>Định dạng: .PNG .JPEG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
