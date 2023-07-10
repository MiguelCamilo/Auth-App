import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Username from './pages/Username'
import Register from './pages/Register'
import Password from './pages/Password'
import Recovery from './pages/Recovery'
import Reset from './pages/Reset'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import PageNotFound from './pages/PageNotFound'

import './App.css'

// auth middleware
import { AuthorizedUser, ProtectedRoute } from './middleware/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/password',
    element: <ProtectedRoute> <Password /> </ProtectedRoute>
  },
  {
    path: '/recovery',
    element: <ProtectedRoute> <Recovery/>  </ProtectedRoute>
  },
  {
    path: '/reset',
    element: <Reset />
  },
  {
    path: '/profile',
    element: <AuthorizedUser> <Profile /> </AuthorizedUser>
  },
  {
    path: '/dashboard',
    element: <AuthorizedUser> <Dashboard /> </AuthorizedUser>
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App

