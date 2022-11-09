import { FirebaseError } from 'firebase/app'
import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { getAuthErrorMessageFromCode } from '../../utils/firebaseErrorCodeTranslator'
import { auth, db } from '../store'

const googleProvider = new GoogleAuthProvider()

interface ILoginDetails {
   email: string
   password: string
}

interface ISignUpDetails {
   firstName: string
   lastName: string
   email: string
   password: string
}

type callbackFunction = (errorMessage: string) => void

export const _logInWithEmailAndPassword = async (
   { email, password }: ILoginDetails,
   callbackErrorMessage?: callbackFunction
) => {
   try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      return response
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
      return false
   }
}

export const _loginInWithGoogle = async (
   callbackErrorMessage?: callbackFunction
) => {
   try {
      const res = await signInWithPopup(auth, googleProvider)
      const user = res.user
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
         await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: user.displayName,
            authProvider: 'google',
            email: user.email,
         })
      }
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
   }
}

export const _signUpWithEmailAndPassword = async (
   { firstName, lastName, email, password }: ISignUpDetails,
   callbackErrorMessage?: callbackFunction
) => {
   try {
      const response = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      )
      return response
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
      return false
   }
}

export const _logout = () => {
   signOut(auth)
}

export const _sendPasswordResetWithEmail = async (
   email: string,
   callbackErrorMessage: callbackFunction
) => {
   try {
      await sendPasswordResetEmail(auth, email)

      return true
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
      return false
   }
}
