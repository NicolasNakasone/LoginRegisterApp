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
  getUser: async (): Promise<User> => {
    return await new Promise(resolve => {
      setTimeout(() => {
        const foundUser = localStorage.getItem('user')
        if (!foundUser) return

        resolve(JSON.parse(foundUser))
      })
    })
  },
  addUser: (newUser: UserInput): Promise<User> => {
    return new Promise(resolve => {
      const storedUsers = localStorage.getItem('users')
      if (!storedUsers) return

      setTimeout(() => {
        const mappedUsers = JSON.parse(storedUsers) as UserList
        mappedUsers[newUser.email] = { id: `${+new Date()}`, ...newUser }
        localStorage.setItem('users', JSON.stringify(mappedUsers))
        resolve(mappedUsers[newUser.email])
      }, 1000)
    })
  },
  findUser: (key: string): Promise<User> => {
    return new Promise(resolve => {
      const storedUsers = localStorage.getItem('users')
      if (!storedUsers) return

      setTimeout(() => {
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
