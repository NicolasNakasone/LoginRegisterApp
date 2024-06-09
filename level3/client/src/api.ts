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
}

// export type UserList = Record<string, User>

const TIMEOUT_MS = 1000

export const api = {
  // getUsers: (): Promise<UserList> => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       const storedUsers = localStorage.getItem('users')
  //       resolve(storedUsers ? JSON.parse(storedUsers) : {})
  //     }, TIMEOUT_MS)
  //   })
  // },
  getUser: (): Promise<AuthenticatedUser> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = localStorage.getItem('user')

        // Esto lo sigo cuando tenga el JWT, asi tiene mas sentido
        // const getUser = fetch(
        //   `https://localhost:3000/users/${(foundUser as unknown as PublicUser)?.id}`
        // )
        /* resolve(JSON.parse(foundUser) ?? foundUser)
          Es una forma valida tambien, pero tiene un problema con TypeScript
        */
        resolve(foundUser && JSON.parse(foundUser))
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
