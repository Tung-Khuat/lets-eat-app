export const MIN_PASSWORD_LENGTH = 5
export const MAX_PASSWORD_LENGTH = 50

export const EMAIL_REGEX = new RegExp(
   '^[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+.[a-z]{2,8}$'
)
export const PASSWORD_REGEX = new RegExp(
   `^[A-Za-z0-9#?!@$%^&*-]{${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}}$`
)
