import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register/Register'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'

import ProductDetail from './pages/ProductDetail/ProducDetail'
import Cart from './pages/Cart'

import CartLayout from './layouts/CartLayout/CartLayout'
import UserLayout from './pages/User/UserLayout'
import ChangePassword from './pages/User/Pages/ChangePassWord'
import Profile from './pages/User/Pages/Profile'
import HistoryPuchases from './pages/User/Pages/HistoryPurchases'
import AdminLayout from './pages/AdminPage/AdminLayout/AdminLayout'
import { path } from './constants/path'
import AdminProducts from './pages/AdminPage/pages/AdminProducts'
import AdminUsers from './pages/AdminPage/pages/AdminUsers'
import AdminCategories from './pages/AdminPage/pages/AdminCategories'
function AdminRoute() {
  const { isAdminRole } = useContext(AppContext)
  return isAdminRole ? <Outlet /> : <Navigate to='/' />
}

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: path.AdminProducts,
          element: (
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          )
        },
        {
          path: path.AdminUsers,
          element: (
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          )
        },
        {
          path: path.AdminCategories,
          element: (
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <UserLayout>
                <Profile />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.ChangePassWord,
          element: (
            <MainLayout>
              <UserLayout>
                <ChangePassword />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.historyPuchases,
          element: (
            <MainLayout>
              <UserLayout>
                <HistoryPuchases />
              </UserLayout>
            </MainLayout>
          )
        },
        {
          path: path.Cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        }
      ]
    },
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/:nameId',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ])
  return routeElements
}
export default useRouteElements
