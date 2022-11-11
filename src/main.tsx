import { StyledEngineProvider } from '@mui/material/styles'
import firebase from 'firebase/compat/app'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import App from './App'
import store from './state/store'

import './styles/global.css'

const rrfProps = {
   firebase,
   config: {
      useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
      attachAuthIsReady: true, // attaches auth is ready promise to store
      firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default)
      preserveOnDelete: null,
   },
   dispatch: store.dispatch,
   createFirestoreInstance,
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}>
         <ReactReduxFirebaseProvider {...rrfProps}>
            <StyledEngineProvider injectFirst>
               <App />
            </StyledEngineProvider>
         </ReactReduxFirebaseProvider>
      </Provider>
   </React.StrictMode>
)
