import React from 'react'

import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'

import defaultAvatar from 'src/assets/avatarDefault.png'
import { clearLS } from 'src/utils/auth'
import { useQueryClient } from 'react-query'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'

const NavHeader = () => {
  const { i18n } = useTranslation()
  const queryClient = useQueryClient()
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = React.useContext(AppContext)

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearLS()
    setProfile(null)
    queryClient.removeQueries({ queryKey: ['shoppingCart', { status: 'In Cart' }] })
  }

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='mx-40 flex justify-end'>
      <Popover
        className='flex cursor-pointer items-center py-1 hover:text-gray-300'
        renderPopover={
          <div className='relative rounded-sm border border-gray-300 bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28 '>
              <button className='px-3 py-2 hover:text-orange' onClick={() => handleChangeLanguage('vi')}>
                Tiếng Việt
              </button>
              <button className='mt-2 px-3 py-2 hover:text-orange' onClick={() => handleChangeLanguage('jp')}>
                Japanese
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='hover:bg-slate-100 block bg-white px-4 py-3 text-left hover:text-cyan-500'
              >
                Tài khoản của bạn
              </Link>
              <Link
                to={path.historyPuchases}
                className='hover:bg-slate-100 block bg-white px-4 py-3 text-left hover:text-cyan-500'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='hover:bg-slate-100 block w-full bg-white px-4 py-3 text-left hover:text-cyan-500'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='mr-2 h-5 w-5 flex-shrink-0'>
            <img
              src={profile?.avatar ? `${path.image}/${profile.avatar}` : defaultAvatar}
              className='h-full w-full rounded-full object-cover'
              alt='avatar'
            />
          </div>
          <div>{profile?.fullName}</div>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40'></div>
          <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </div>
  )
}

export default NavHeader
