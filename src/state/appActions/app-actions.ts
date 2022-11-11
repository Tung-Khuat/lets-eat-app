export interface ICurrentLocalAuthUser {
   uid: string
   email: string | null
}

export const _saveUserDataToLocal = (user: ICurrentLocalAuthUser) => ({
   type: 'SAVE_USER_DATA_TO_LOCAL',
   user,
})

export const _clearUserDataFromLocal = () => ({
   type: 'CLEAR_USER_DATA_FROM_LOCAL',
})
