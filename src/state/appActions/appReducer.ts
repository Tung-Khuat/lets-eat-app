import { AnyAction } from 'redux'

export const initialState = {
   currentLocalAuthUser: null,
}

export default function appReducer(state = initialState, action: AnyAction) {
   switch (action.type) {
      case 'SAVE_USER_DATA_TO_LOCAL':
         return { ...state, currentLocalAuthUser: action.user }

      case 'CLEAR_USER_DATA_FROM_LOCAL':
         return {
            ...state,
            currentLocalAuthUser: initialState.currentLocalAuthUser,
         }

      default:
         return state
   }
}
