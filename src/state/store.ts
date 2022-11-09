import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'
import { firebaseReducer } from 'react-redux-firebase'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { load, save } from 'redux-localstorage-simple'
import thunk from 'redux-thunk'

const {
   VITE_FIREBASE_APIKEY,
   VITE_FIREBASE_AUTHDOMAIN,
   VITE_FIREBASE_PROJECTID,
   VITE_FIREBASE_STORAGEBUCKET,
   VITE_FIREBASE_MESSAGINGSENDERID,
   VITE_FIREBASE_APPID,
   VITE_FIREBASE_MEASUREMENTID,
   VITE_ENV,
} = import.meta.env

// Firebase configuration
const firebaseConfig = {
   apiKey: VITE_FIREBASE_APIKEY,
   authDomain: VITE_FIREBASE_AUTHDOMAIN,
   projectId: VITE_FIREBASE_PROJECTID,
   storageBucket: VITE_FIREBASE_STORAGEBUCKET,
   messagingSenderId: VITE_FIREBASE_MESSAGINGSENDERID,
   appId: VITE_FIREBASE_APPID,
   measurementId: VITE_FIREBASE_MEASUREMENTID,
}

// Initialize firebase instance
export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const functions = getFunctions(firebaseApp)

if (VITE_ENV === 'development') {
   connectFunctionsEmulator(functions, 'localhost', 5001)
}

const reducers = combineReducers({
   firebaseReducer,
   firestoreReducer,
})

const persistedReducers = ['app', 'auth']
const persistedNamespace = 'app'

const store = createStore(
   reducers,
   load({
      states: persistedReducers,
      namespace: persistedNamespace,
      disableWarnings: true,
   }),
   compose(
      applyMiddleware(thunk),
      applyMiddleware(
         save({
            states: persistedReducers,
            namespace: persistedNamespace,
            debounce: 500,
         })
      )
   )
)

export default store
