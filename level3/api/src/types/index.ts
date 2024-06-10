export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

export type PublicUser = Omit<User, 'password'>

export interface AuthenticatedUser {
  userData: PublicUser
  accessToken: string | null
  refreshToken: string | null
}

/* Esto despues puede ser algo que tenga el code como un enum, cosa de
  copiar ese enum al front para no tener que manejar strings
*/
export interface ResponseError {
  code: string
  message: string
}
