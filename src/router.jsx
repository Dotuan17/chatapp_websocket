import { createBrowserRouter } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import ChatApp from './Chatapp'
import LoginTraditional from './LoginTraditional'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/chat',
    element: <ChatApp />
  },
  {
    path: '/auth',
    element: <LoginTraditional />
  }
])

export default router
