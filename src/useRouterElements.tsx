import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register/Register'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import AddProduct from './pages/AdminPage'
import ProductDetail from './pages/ProductDetail/ProducDetail'
import Cart from './pages/Cart'
import { path } from './constants/path'
import CartLayout from './layouts/CartLayout/CartLayout'
import UserLayout from './pages/User/UserLayout'
import ChangePassword from './pages/User/Pages/ChangePassWord'
import Profile from './pages/User/Pages/Profile'
import HistoryPuchases from './pages/User/Pages/HistoryPurchases'
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
          path: '/add',
          element: (
            <RegisterLayout>
              <AddProduct />
            </RegisterLayout>
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
