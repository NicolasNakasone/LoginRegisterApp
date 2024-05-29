export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

export type UserInput = Omit<User, 'id'>

export type UserList = Record<string, User>

const mockUsers: UserList = {
  // ['foo@bar.com']: {
  //   id: `${+new Date()}`,
  //   email: 'foo@bar.com',
  //   password: '1234',
  //   full_name: 'foo@bar.com',
  // },
  // ['asd@asd.com']: {
  //   id: `${+new Date()}`,
  //   email: 'asd@asd.com',
  //   password: '1234',
  //   full_name: 'asd@asd.com',
  // },
}

export const api = {
  findUser: (key: string) => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      const mappedUsers = JSON.parse(storedUsers) as UserList
      return mappedUsers[key]
    }
    return
  },
  getUsers: (): Promise<UserList> => {
    return new Promise(resolve => setTimeout(() => resolve(mockUsers), 1000))
  },
  addUser: (newUser: UserInput): Promise<User> => {
    return new Promise(resolve =>
      setTimeout(() => {
        mockUsers[newUser.email] = { id: `${+new Date()}`, ...newUser }

        localStorage.setItem('users', JSON.stringify(mockUsers))

        resolve(mockUsers[newUser.email])
      }, 1000)
    )
  },
}
