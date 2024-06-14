export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

export type PublicUser = Omit<User, 'password'>

export type UserInput = Omit<User, 'id'>
export type LoginInput = Omit<User, 'id' | 'full_name'>

export interface AuthenticatedUser {
  userData: PublicUser
  accessToken: string | null
  refreshToken: string | null
}

const TIMEOUT_MS = 1000
const { VITE_API_URL } = import.meta.env

async function handleFetch(
  url: RequestInfo,
  options?: RequestInit | undefined
): Promise<Response | null> {
  const user = localStorage.getItem('user')
  if (!user) return null

  const response = await fetch(url, options)
  if (!(response.status === 401)) return response

  const { refreshToken, userData } = JSON.parse(user) as AuthenticatedUser

  // Token expirado, renovar
  const refreshResponse = await fetch(`${VITE_API_URL}/refresh-token`, {
    body: JSON.stringify({ refreshToken }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  if (!refreshResponse.ok) return refreshResponse

  const { accessToken: newAccessToken } = await refreshResponse.json()

  const userMapped: AuthenticatedUser = {
    accessToken: newAccessToken,
    refreshToken,
    userData,
  }
  localStorage.setItem('user', JSON.stringify(userMapped))

  // Reintentar la request original
  return handleFetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${newAccessToken}`,
    },
  })
}

export const api = {
  getUser: (): Promise<AuthenticatedUser | null> => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const foundUser = localStorage.getItem('user')
        if (!foundUser) {
          resolve(null)
          return
        }

        /* resolve(JSON.parse(foundUser) ?? foundUser)
          Es una forma valida tambien, pero tiene un problema con TypeScript
        */

        const typedUser: AuthenticatedUser = JSON.parse(foundUser)

        const getWithHandleFetch = handleFetch(`${VITE_API_URL}/users/${typedUser.userData.id}`, {
          headers: {
            Authorization: `Bearer ${typedUser.accessToken}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })

        const userResponse = await getWithHandleFetch

        const publicUser: PublicUser = await userResponse?.json()
        if (!publicUser?.id) resolve(null)

        resolve(typedUser)
      }, TIMEOUT_MS)
    })
  },
  logout: (): Promise<void> => {
    return new Promise(resolve =>
      setTimeout(() => {
        localStorage.removeItem('user')
        resolve()
      }, TIMEOUT_MS)
    )
  },
}
