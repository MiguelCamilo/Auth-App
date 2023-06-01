import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Password from './components/Password'
import PageNotFound from './components/PageNotFound'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import Register from './components/Register'
import Reset from './components/Reset'
import Username from './components/Username'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Root Route</div>
  },
  {
    path: '/register',
    element: <div>Register Route</div>
  },
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

