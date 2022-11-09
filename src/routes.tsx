import { lazy } from 'react'

const Login = lazy(() => import('./pages/authentication/login'))
const PasswordRecovery = lazy(
   () => import('./pages/authentication/password-recovery')
)
const SignUp = lazy(() => import('./pages/authentication/signup'))
const Dashboard = lazy(() => import('./pages/dashboard'))

const routes = [
   // Auth
   {
      title: 'Sign Up',
      component: <SignUp />,
      path: '/signup',
      category: 'auth',
      disabled: false,
      isPublic: true,
   },
   {
      title: 'Login',
      component: <Login />,
      path: '/login',
      category: 'auth',
      disabled: false,
      isPublic: true,
   },
   {
      title: 'Password Recovery',
      component: <PasswordRecovery />,
      path: '/password-recovery',
      category: 'auth',
      disabled: false,
      isPublic: true,
   },

   // Dashboard
   {
      title: 'Dashboard',
      component: <Dashboard />,
      path: '/',
      category: 'dashboard',
      disabled: false,
      isPublic: false,
   },
]

export default routes
