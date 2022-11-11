import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FullViewLoading from './components/feedback/loadingIndicators/FullViewLoading'
import PrivateRoute from './PrivateRoute'
import routes from './routes'
import {
   _clearUserDataFromLocal,
   _saveUserDataToLocal,
} from './state/appActions/app-actions'
import { auth } from './state/store'

export interface IRoute {
   title: string
   path: string
   component: JSX.Element
   disabled: boolean
   isPublic: boolean
   category: string
}

type createRouteElementFunc = (route: IRoute, index: any) => any

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
         if (userAuth) {
            dispatch(
               _saveUserDataToLocal({
                  uid: userAuth.uid,
                  email: userAuth.email,
               })
            )
         } else {
            dispatch(_clearUserDataFromLocal())
         }
      })
      return unsubscribe
   }, [])

   // Routing
   const createRouteElement: createRouteElementFunc = (
      route: IRoute,
      index
   ) => {
      const routeProps = {
         index,
         key: route.path,
         path: route.path,
         element: route.component,
      }

      if (!route.isPublic) {
         return (
            <Route
               {...routeProps}
               element={<PrivateRoute element={route.component} />}
            />
         )
      }

      return <Route {...routeProps} />
   }

   const routeElements = routes.map(createRouteElement)
   const renderRoute = () => {
      return (
         <>
            <Routes>{routeElements}</Routes>
         </>
      )
   }

   return (
      <Suspense fallback={<FullViewLoading />}>
         <Router>{renderRoute()}</Router>
      </Suspense>
   )
}

export default App
