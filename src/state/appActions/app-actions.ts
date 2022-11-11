export interface ICurrentLocalAuthUser {
   uid: string
   email: string | null
}

export const _saveUserUIDToLocal = (userUID: string) => ({
   type: 'SAVE_AUTH_USER_UID_TO_LOCAL',
   userUID,
})

export const _saveUserToLocal = (user: ICurrentLocalAuthUser) => ({
   type: 'SAVE_AUTH_USER_TO_LOCAL',
   user,
})

export const _clearUserDataFromLocal = () => ({
   type: 'CLEAR_USER_DATA_FROM_LOCAL',
})
