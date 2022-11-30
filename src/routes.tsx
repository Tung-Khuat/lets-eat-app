import { Icon } from '@material-ui/core'
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

   // Menu Items
   {
      title: 'Meal planner',
      component: <Dashboard />,
      path: '/meal-planner',
      category: 'meal-planner',
      includeInSidebar: true,
      icon: <Icon>calendarMonth</Icon>,
      sidebarMenuGroup: 'main-features',
      disabled: false,
      isPublic: false,
   },
   {
      title: 'Explore',
      component: <Dashboard />,
      path: '/explore',
      category: 'recipes',
      includeInSidebar: true,
      icon: <Icon>restaurant</Icon>,
      sidebarMenuGroup: 'main-features',
      disabled: false,
      isPublic: false,
   },
   {
      title: 'Groceries',
      component: <Dashboard />,
      path: '/groceries',
      category: 'shopping',
      includeInSidebar: true,
      icon: <Icon>cart</Icon>,
      sidebarMenuGroup: 'main-features',
      disabled: false,
      isPublic: false,
   },
]

export default routes
