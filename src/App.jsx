import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Username from './components/Username'
import Register from './components/Register'
import Password from './components/Password'
import Recovery from './components/Recovery'
import Reset from './components/Reset'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'

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

