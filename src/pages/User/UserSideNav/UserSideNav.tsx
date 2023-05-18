import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import defaultAvatar from 'src/assets/avatarDefault.png'
import { path } from 'src/constants/path'

const UserSideNav = () => {
  const { profile } = React.useContext(AppContext)
  const [activeLink, setActiveLink] = useState('/user/profile')
  useEffect(() => {
    const path = window.location.pathname
    setActiveLink(path)
  }, [])
  const handleClick = (link: React.SetStateAction<string>) => {
    setActiveLink(link)
  }

  return (
    <div>
      <div className='m-7 flex items-center border-b border-b-gray-200 py-4'>
        <NavLink
          to='/user/profile'
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
          onClick={() => handleClick('/user/profile')}
        >
          <img
            src={profile?.avatar ? `${path.image}/${profile.avatar}` : defaultAvatar}
            alt=''
            className='h-full w-full object-cover'
          />
        </NavLink>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.fullName}</div>
          <NavLink
            to='/user/profile'
            className='flex items-center capitalize text-gray-500'
            onClick={() => handleClick('/user/profile')}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            Sửa hồ sơ
          </NavLink>
        </div>
      </div>
      <div className='m-7'>
        <NavLink
          to='/user/profile'
          className={`my-4 flex items-center capitalize transition-colors ${
            activeLink === '/user/profile' ? 'text-orange' : 'text-gray-500'
          }`}
          onClick={() => handleClick('/user/profile')}
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
              alt=''
              className='h-full w-full'
            />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to='/user/password'
          className={` my-4 flex items-center capitalize transition-colors ${
            activeLink === '/user/password' ? 'text-orange' : 'text-gray-500'
          }`}
          onClick={() => handleClick('/user/password')}
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <svg
              className='fill-violet-600 h-full w-full'
              xmlns='http://www.w3.org/2000/svg'
              height='30'
              viewBox='0 96 960 960'
              width='48'
            >
              <path d='M280 816q-100 0-170-70T40 576q0-100 70-170t170-70q78 0 131.5 37.5T491 473h429v206H814v137H628V679H491q-26 62-79.5 99.5T280 816Zm0-60q71 0 116.5-47t53.5-90h242v137h62V619h106v-86H450q-8-43-53.5-90T280 396q-75 0-127.5 52.5T100 576q0 75 52.5 127.5T280 756Zm0-112q29 0 48.5-19.5T348 576q0-29-19.5-48.5T280 508q-29 0-48.5 19.5T212 576q0 29 19.5 48.5T280 644Zm0-68Z' />
            </svg>
          </div>
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to='/user/historyPurchases'
          className={`my-4 flex items-center capitalize  transition-colors ${
            activeLink === '/user/historyPurchases' ? 'text-orange' : 'text-gray-500'
          }`}
          onClick={() => handleClick('/user/historyPurchases')}
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
              alt=''
              className='h-full w-full'
            />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
export default UserSideNav
