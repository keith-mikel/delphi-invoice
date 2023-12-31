import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home'
import Error from './pages/Error';
import Login from './pages/Login';
import Profile from './pages/Profile'
import SignupPage from './pages/Signup'
import Invoice from './pages/Invoice'
import Update from './pages/Update'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
      path: '/signup',
      element: <SignupPage />
      },
      {
        path: '/invoice',
        element: <Invoice />
      },
      {
        path: '/update',
        element: <Update />
      }
    ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
