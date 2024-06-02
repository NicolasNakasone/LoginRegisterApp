export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

export type UserInput = Omit<User, 'id'>

export type UserList = Record<string, User>

export const api = {
  getUsers: (): Promise<UserList> => {
    return new Promise(resolve => {
      const storedUsers = localStorage.getItem('users')
      if (!storedUsers) return

      setTimeout(() => {
        const mappedUsers = JSON.parse(storedUsers) as UserList
        resolve(mappedUsers)
      }, 1000)
    })
  },
  getUser: (): Promise<User> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = localStorage.getItem('user')
        /* resolve(JSON.parse(foundUser) ?? foundUser)
          Es una forma valida tambien, pero tiene un problema con TypeScript
        */
        resolve(foundUser && JSON.parse(foundUser))
      }, 1000)
    })
  },
  addUser: (newUser: UserInput): Promise<User> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const storedUsers = localStorage.getItem('users')
        let userList: UserList = {}

        if (storedUsers) userList = JSON.parse(storedUsers)

        userList[newUser.email] = { id: `${+new Date()}`, ...newUser }
        localStorage.setItem('users', JSON.stringify(userList))

        resolve(userList[newUser.email])
      }, 1000)
    })
  },
  findUser: (key: string): Promise<User | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const storedUsers = localStorage.getItem('users')
        if (!storedUsers) return resolve(null)

        const mappedUsers = JSON.parse(storedUsers) as UserList
        resolve(mappedUsers[key])
      }, 1000)
    })
  },
  login: (newUser: User): Promise<User> => {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify(newUser))
        resolve(newUser)
      }, 1000)
    })
  },
}
