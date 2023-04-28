import React, { useState } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { HiMenuAlt2, HiOutlineCog, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { BsGrid3X3GapFill } from 'react-icons/bs'
import { CgMenuGridR } from 'react-icons/cg'
import { MdOutlinePeopleOutline } from 'react-icons/md'
import { AiOutlineShopping } from 'react-icons/ai'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Sidebar from './Components/Sidebar'

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div className='flex'>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <div className='flex min-w-0 flex-1 flex-col'>
        {/* Top Bar */}
        <div className='flex h-16 items-center justify-between border-b border-gray-200 bg-gray-100 px-4'>
          {/* Hamburger Menu */}
          <button
            className='text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none'
            onClick={toggleSidebar}
          >
            <span className='sr-only'>Open sidebar</span>
            <HiMenuAlt2 className='h-6 w-6' />
          </button>

          {/* Right Menu */}
          <div className='flex items-center'>
            {/* Dropdown Menu */}
            <div className='relative ml-4'>
              <button className='flex items-center focus:text-gray-600 focus:outline-none' onClick={toggleDropdown}>
                <span className='mr-1 text-sm text-gray-500'>Admin</span>
                {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <ul
                className={`absolute right-0 mt-2 w-40 rounded-md bg-white py-1 shadow-lg ${
                  isDropdownOpen ? '' : 'hidden'
                }`}
              >
                <li>
                  <NavLink
                    exact
                    to='/'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    activeClassName='bg-gray-100 text-gray-900'
                  >
                    <HiOutlineUser className='mr-2 inline-block h-5 w-5' />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to='/settings'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    activeClassName='bg-gray-100 text-gray-900'
                  >
                    <HiOutlineCog className='mr-2 inline-block h-5 w-5' />
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to='/logout'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    activeClassName='bg-gray-100 text-gray-900'
                  >
                    <HiOutlineLogout className='mr-2 inline-block h-5 w-5' />
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className='max-h-full flex-1 overflow-y-auto'></div>
      </div>
    </div>
  )
}
export default AdminPage
