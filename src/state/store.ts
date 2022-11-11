import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/functions'
import { getStorage } from 'firebase/storage'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { load, save } from 'redux-localstorage-simple'
import thunk from 'redux-thunk'
import appReducer from './appActions/appReducer'

const {
   VITE_FIREBASE_APIKEY,
   VITE_FIREBASE_AUTHDOMAIN,
   VITE_FIREBASE_PROJECTID,
   VITE_FIREBASE_STORAGEBUCKET,
   VITE_FIREBASE_MESSAGINGSENDERID,
   VITE_FIREBASE_APPID,
   VITE_FIREBASE_MEASUREMENTID,
   VITE_FIREBASE_EMULATORS,
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
export const REGION = 'europe-west3'
export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const storage = getStorage(firebaseApp)
export const auth = getAuth(firebaseApp)
export const functions = firebaseApp.functions(REGION)

if (VITE_FIREBASE_EMULATORS === 'enabled') {
   firebaseApp.functions(REGION).useEmulator('localhost', 5001)
   // firebaseApp.firestore().useEmulator('localhost', 8080)
   firebase.firestore()
} else {
   firebase.firestore()
   firebase.functions()
}

const reducers = combineReducers({
   app: appReducer,
   firestoreReducer: firestoreReducer,
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
