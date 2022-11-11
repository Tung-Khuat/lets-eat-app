import { FirebaseError } from 'firebase/app'
import 'firebase/functions'
import { getAuthErrorMessageFromCode } from '../../utils/firebaseErrorCodeTranslator'
import { functions } from '../store'
import { errorMessageCallbackFunction } from './auth-actions'

export interface IUser {
   firstName?: string
   lastName?: string
   photoURL?: string
}

export interface INewUser {
   firstName: string
   lastName: string
   displayName: string
   email: string | null
   uid: string
   metadata: object
}

export const _createUser = (
   newUser: INewUser,
   callbackErrorMessage?: errorMessageCallbackFunction
) =>
   async function (/* dispatch, getState, getFirebase*/) {
      try {
         const createUser = functions.httpsCallable('createUser')
         const result = await createUser(newUser)
         return result
      } catch (err) {
         if (err instanceof FirebaseError) {
            const errorMessage = getAuthErrorMessageFromCode(
               err as FirebaseError
            )
            console.error(errorMessage)
            callbackErrorMessage && callbackErrorMessage(errorMessage)
         }
         return false
      }
   }

export const _updateUser = (
   updatedUser: IUser,
   uid: string,
   callbackErrorMessage?: errorMessageCallbackFunction
) =>
   async function (/* dispatch, getState, getFirebase*/) {
      try {
         const updateUser = functions.httpsCallable('updateUser')
         const result = await updateUser({ ...updatedUser, uid })
         return result
      } catch (err) {
         if (err instanceof FirebaseError) {
            const errorMessage = getAuthErrorMessageFromCode(
               err as FirebaseError
            )
            console.error(errorMessage)
            callbackErrorMessage && callbackErrorMessage(errorMessage)
         }
         return false
      }
   }
