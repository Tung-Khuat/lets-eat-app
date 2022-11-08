import { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FullViewLoading from './components/feedback/loadingIndicators/FullViewLoading'
import routes from './routes'
interface IRoute {
   title: string
   path: string
   component: JSX.Element
   disabled: boolean
   isPublic: boolean
   category: string
}
type createRouteElementFunc = (route: IRoute, index: any) => any

function App() {
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
