import { Suspense, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { compose } from 'redux'
import FullViewLoading from './components/feedback/loadingIndicators/FullViewLoading'
import PrivateRoute from './PrivateRoute'
import routes from './routes'
import {
   _clearUserDataFromLocal,
   _saveUserToLocal,
   _saveUserUIDToLocal,
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

function App({ UsersFoundWithAuthUID }: any) {
   const dispatch = useDispatch()

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
         if (userAuth) {
            dispatch(_saveUserUIDToLocal(userAuth.uid))
         } else {
            dispatch(_clearUserDataFromLocal())
         }
      })
      return unsubscribe
   }, [])

   useEffect(() => {
      const authUser = Array.isArray(UsersFoundWithAuthUID)
         ? UsersFoundWithAuthUID[0]
         : null
      dispatch(_saveUserToLocal(authUser))
   }, [UsersFoundWithAuthUID])

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

const mapUserUUIDState = ({ app: { currentLocalAuthUserUID } }: any) => ({
   currentLocalAuthUserUID,
})

const mapState = ({
   firestoreReducer: {
      ordered: { UsersFoundWithAuthUID },
   },
}: any) => ({
   UsersFoundWithAuthUID,
})

export default compose(
   connect(mapUserUUIDState),
   firestoreConnect(
      ({ currentLocalAuthUserUID }: { currentLocalAuthUserUID: string }) => {
         if (!currentLocalAuthUserUID) {
            return []
         }
         return [
            {
               collection: 'users',
               where: [['uid', '==', currentLocalAuthUserUID || '']],
               storeAs: 'UsersFoundWithAuthUID',
               limit: 1,
            },
         ]
      }
   ),
   connect(mapState)
)(App)
