import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Username from './components/UserName'
import Register from './components/Register'
import Password from './components/Password'
import Recovery from './components/Recovery'
import Reset from './components/Reset'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'

import './App.css'

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
    element: <Password />
  },
  {
    path: '/recovery',
    element: <Recovery />
  },
  {
    path: '/reset',
    element: <Reset />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])

const App = () => {
  return (
    <main>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </main>
  );
}

export default App

