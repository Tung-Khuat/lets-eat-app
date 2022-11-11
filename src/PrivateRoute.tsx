import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import FullViewLoading from './components/feedback/loadingIndicators/FullViewLoading'
import { auth } from './state/store'

interface IPrivateRoute {
   element: JSX.Element
}

function PrivateRoute(props: IPrivateRoute) {
   const { element } = props
   const [user, loading, error] = useAuthState(auth)

   if (loading) return <FullViewLoading />

   return user ? element : <Navigate to="/login" />
}

export default PrivateRoute
