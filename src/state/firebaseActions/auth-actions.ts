import { FirebaseError } from 'firebase/app'
import {
   createUserWithEmailAndPassword,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signOut,
} from 'firebase/auth'
import { getAuthErrorMessageFromCode } from '../../utils/firebaseErrorCodeTranslator'
import { auth, functions } from '../store'

interface ILoginDetails {
   email: string
   password: string
}

interface ISignUpDetails {
   email: string
   password: string
}

export type errorMessageCallbackFunction = (errorMessage: string) => void

const _updateUserInfoOnSignin = async (
   updatedUser: any,
   uid: string,
   callbackErrorMessage?: errorMessageCallbackFunction
) => {
   try {
      const updateUser = functions.httpsCallable('updateUser')
      const result = await updateUser({ ...updatedUser, uid })
      return result
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
      return false
   }
}

export const _logInWithEmailAndPassword = async (
   { email, password }: ILoginDetails,
   callbackErrorMessage?: errorMessageCallbackFunction
) => {
   try {
      const userCredential = await signInWithEmailAndPassword(
         auth,
         email,
         password
      )
      const { metadata, providerData, emailVerified, uid } = userCredential.user
      const updatedUser = {
         metadata,
         providerData,
         emailVerified,
      }
      await _updateUserInfoOnSignin(updatedUser, uid)
      return userCredential
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
      return false
   }
}

export const _signUpWithEmailAndPassword = async (
   { email, password }: ISignUpDetails,
   callbackErrorMessage?: errorMessageCallbackFunction
) => {
   try {
      const userCredential = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      )

      return userCredential
   } catch (err) {
      if (err instanceof FirebaseError) {
         const errorMessage = getAuthErrorMessageFromCode(err as FirebaseError)
         console.error(errorMessage)
         callbackErrorMessage && callbackErrorMessage(errorMessage)
      }
      return false
   }
}

export const _sendPasswordResetWithEmail = async (
   email: string,
   callbackErrorMessage?: errorMessageCallbackFunction
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

export const _logout = () => {
   signOut(auth)
}
