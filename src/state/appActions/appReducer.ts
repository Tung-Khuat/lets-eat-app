import { AnyAction } from 'redux'

export const initialState = {
   currentLocalAuthUser: null,
   currentLocalAuthUserUID: '',
}

export default function appReducer(state = initialState, action: AnyAction) {
   switch (action.type) {
      case 'SAVE_AUTH_USER_UID_TO_LOCAL':
         return { ...state, currentLocalAuthUserUID: action.userUID }

      case 'SAVE_AUTH_USER_TO_LOCAL':
         return { ...state, currentLocalAuthUser: action.user }

      case 'CLEAR_USER_DATA_FROM_LOCAL':
         return {
            ...state,
            currentLocalAuthUser: initialState.currentLocalAuthUser,
            currentLocalAuthUserUID: initialState.currentLocalAuthUserUID,
         }

      default:
         return state
   }
}
