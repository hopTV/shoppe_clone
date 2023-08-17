import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/productList'
import Login from './pages/login'
import Register from './pages/register'
import RegisterLayout from './layout/registerLayout'
import MainLayout from './layout/mainLayout'
import { AppContext } from './contexts/app.context'
import { path } from 'src/constants/path'
import ProductDetail from './pages/productDetail'
import CartLayout from './layout/cartLayout'
import Cart from './pages/cart'
import UserLayout from './pages/user/layouts/userLayout'
import Profile from './pages/user/pages/profile'
import ChangePassword from './pages/user/pages/changePassword'
import HistoryPuchase from './pages/user/pages/historyPurchase'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElement = () => {
  const routeElement = useRoutes([
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
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },

    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPuchase />
            }
          ]
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
          path: path.resgister,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElement
}

export default useRouteElement
