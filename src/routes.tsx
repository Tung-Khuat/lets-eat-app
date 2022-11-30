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
      icon: <Icon>today</Icon>,
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
      icon: <Icon>explore</Icon>,
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
      icon: <Icon>shopping_basket</Icon>,
      sidebarMenuGroup: 'main-features',
      disabled: false,
      isPublic: false,
   },

   {
      title: 'Recipes',
      component: <Dashboard />,
      path: '/recipes',
      category: 'recipes',
      includeInSidebar: true,
      icon: <Icon>book</Icon>,
      sidebarMenuGroup: 'food-features',
      disabled: false,
      isPublic: false,
   },
   {
      title: 'Basic Foods',
      component: <Dashboard />,
      path: '/basic-foods',
      category: 'basic-foods',
      includeInSidebar: true,
      icon: <Icon>restaurant</Icon>,
      sidebarMenuGroup: 'food-features',
      disabled: false,
      isPublic: false,
   },
]

export default routes
