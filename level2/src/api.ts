export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

export type UserInput = Omit<User, 'id'>

export type UserList = Record<string, User>

export const api = {
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
}
