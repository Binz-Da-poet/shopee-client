import { useEffect, useState } from 'react'

import { faArrowLeft, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import { path } from 'src/constants/path'
interface Props {
  children?: React.ReactNode
}
function AdminLayout({ children }: Props) {
  const [activeLink, setActiveLink] = useState('/AdminProducts')
  useEffect(() => {
    const pathLocal = window.location.pathname
    setActiveLink(pathLocal)
  }, [])
  const handleClick = (link: React.SetStateAction<string>) => {
    setActiveLink(link)
  }
  const [open, setOpen] = useState(true)
  return (
    <div className='flex'>
      <div className={`${open ? 'w-80' : 'w-16'}  relative h-screen bg-orange  p-5 pt-8 duration-300`}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`absolute -right-3 top-9 w-5 cursor-pointer rounded-full border-2 border-orange bg-white ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className='flex items-center gap-x-4'>
          <FontAwesomeIcon icon={faBarsStaggered} className={`cursor-pointer duration-500`} />
          <h1 className={`${!open && 'scale-0'} m-auto origin-left text-xl font-medium text-white`}>DASHBOARD</h1>
        </div>
        <div className={`${!open && 'scale-0'} pt-6`}>
          <NavLink
            to={path.AdminProducts}
            className={`${
              activeLink === '/AdminProducts' ? ' bg-white text-black' : ''
            } flex cursor-pointer items-center justify-center gap-x-4 rounded-md p-2 text-sm hover:bg-white `}
            onClick={() => handleClick('/AdminProducts')}
          >
            PRODUCTS
          </NavLink>
          <NavLink
            to={path.AdminUsers}
            className={`${
              activeLink === '/AdminUsers' ? ' bg-white text-black' : ''
            } mt-1 flex cursor-pointer items-center justify-center gap-x-4 rounded-md p-2 text-sm hover:bg-white`}
            onClick={() => handleClick('/AdminUsers')}
          >
            USERS
          </NavLink>
          <NavLink
            to='/AdminCategories'
            className={`${
              activeLink === '/AdminCategories' ? ' bg-white text-black' : ''
            } mt-1 flex cursor-pointer items-center justify-center gap-x-4 rounded-md p-2  text-sm hover:bg-white `}
            onClick={() => handleClick('/AdminCategories')}
          >
            CATEGORIES
          </NavLink>
          <NavLink
            to='/'
            className={` mt-1 flex cursor-pointer items-center justify-center gap-x-4 rounded-md p-2   text-sm hover:bg-white`}
          >
            HOMEPAGE
          </NavLink>
        </div>
      </div>

      <div className='h-fit w-full p-7 text-2xl font-semibold'>{children}</div>
    </div>
  )
}
export default AdminLayout
