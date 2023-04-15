import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Login from './pages/Login'
import ProductList from './pages/ProductList'
import Register from './pages/Register/Register'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout'
import Profile from './pages/Profile'
import path from './constants/path'
import AddProduct from './pages/addproduct'
import ProductDetail from './pages/ProductDetail/ProducDetail'
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
      path: '/productDetail',

      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
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
              <Profile />
            </MainLayout>
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
    }
  ])
  return routeElements
}
export default useRouteElements
