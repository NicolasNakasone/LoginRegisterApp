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

// TODO: Refactorizar/corregir
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
  // getUsers: (): Promise<UserList> => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       const storedUsers = localStorage.getItem('users')
  //       resolve(storedUsers ? JSON.parse(storedUsers) : {})
  //     }, TIMEOUT_MS)
  //   })
  // },
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

        // La idea es devolver el mismo usuario logueado
        // Es decir, un AuthenticatedUser
        // Para esto habra que realizar algo mas coherente en el servidor
        // Ya que se envia el token pero no se verifica en el servidor
        resolve(typedUser)
      }, TIMEOUT_MS)
    })
  },
  // addUser: (newUser: UserInput): Promise<User> => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       const storedUsers = localStorage.getItem('users')
  //       let userList: UserList = {}

  //       if (storedUsers) userList = JSON.parse(storedUsers)

  //       userList[newUser.email] = { id: `${+new Date()}`, ...newUser }
  //       localStorage.setItem('users', JSON.stringify(userList))

  //       resolve(userList[newUser.email])
  //     }, TIMEOUT_MS)
  //   })
  // },
  // findUser: (key: string): Promise<User | null> => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       const storedUsers = localStorage.getItem('users')
  //       resolve(storedUsers ? JSON.parse(storedUsers)[key] : storedUsers)
  //     }, TIMEOUT_MS)
  //   })
  // },
  // login: (newUser: User): Promise<User> => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       localStorage.setItem('user', JSON.stringify(newUser))
  //       resolve(newUser)
  //     }, TIMEOUT_MS)
  //   })
  // },
  logout: (): Promise<void> => {
    return new Promise(resolve =>
      setTimeout(() => {
        localStorage.removeItem('user')
        resolve()
      }, TIMEOUT_MS)
    )
  },
}
