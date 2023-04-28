import { NavLink } from 'react-router-dom'
import { CgMenuGridR } from 'react-icons/cg'
import { MdOutlinePeopleOutline } from 'react-icons/md'
import { AiOutlineShopping } from 'react-icons/ai'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed inset-0 z-40 flex lg:hidden ${isOpen ? '' : 'hidden'}`}>
      {/* Backdrop */}
      <div className='fixed inset-0' onClick={toggleSidebar}>
        <div className='absolute inset-0 bg-gray-600 opacity-75'></div>
      </div>

      {/* Menu */}
      <div className='relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4'>
        <div className='absolute top-0 right-0 -mr-14 p-1'>
          <button
            className='flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none'
            onClick={toggleSidebar}
          >
            <CgMenuGridR className='h-6 w-6 text-white' />
          </button>
        </div>
        <div className='flex flex-shrink-0 items-center px-4'>
          <img
            className='h-8 w-auto'
            src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
            alt='Workflow'
          />
        </div>
        <nav className='mt-5 h-full flex-shrink-0 divide-y divide-gray-700 overflow-y-auto'>
          <div className='space-y-1 px-2'>
            <NavLink
              exact
              to='/'
              className='flex items-center rounded-md bg-gray-900 px-2 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out focus:bg-gray-700 focus:outline-none'
              activeClassName='bg-gray-900'
            >
              <AiOutlineShopping className='mr-4 h-6 w-6' />
              Products
            </NavLink>
            <NavLink
              exact
              to='/categories'
              className='flex items-center rounded-md px-2 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-gray-700 hover:text-gray-200 focus:bg-gray-700 focus:text-gray-200 focus:outline-none'
              activeClassName='bg-gray-900'
            >
              <MdOutlinePeopleOutline className='mr-4 h-6 w-6' />
              Categories
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
