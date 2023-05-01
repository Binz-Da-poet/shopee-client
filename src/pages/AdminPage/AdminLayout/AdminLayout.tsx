import { useState } from 'react'
import Sidenav from '../Components/Sidenav'
import Footer from './Footer/Footer'
import { faArrowLeft, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
interface Props {
  children?: React.ReactNode
}
function AdminLayout({ children }: Props) {
  const [open, setOpen] = useState(true)
  return (
    <div className='flex'>
      <div className={`${open ? 'w-80' : 'w-16'} h-fix relative bg-orange  p-5 pt-8 duration-300`}>
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
            to='/'
            className={`flex cursor-pointer  items-center gap-x-4 rounded-md p-2 text-sm text-gray-50 hover:bg-white hover:text-black  `}
          >
            PRODUCTS
          </NavLink>
          <NavLink
            to='/'
            className={`flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm text-gray-50 hover:bg-white hover:text-black  `}
          >
            USERS
          </NavLink>
          <NavLink
            to='/'
            className={`flex cursor-pointer  items-center gap-x-4 rounded-md p-2 text-sm text-gray-50 hover:bg-white hover:text-black  `}
          >
            CATEGORIES
          </NavLink>
        </div>
      </div>

      <div className='w-full p-7 text-2xl font-semibold'>{children}</div>
    </div>
  )
}
export default AdminLayout
