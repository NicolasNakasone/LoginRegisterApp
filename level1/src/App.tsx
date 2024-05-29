import { SetStateAction, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import { HomePage, LoginPage, RegisterPage } from 'src/pages'

export interface CommonPageProps {
  setIsLogged: (value: SetStateAction<boolean>) => void
}

// Mover a api.ts
export interface User {
  id: string
  email: string
  password: string
  full_name: string
}

export type UserInput = Omit<User, 'id'>

type UserList = Record<string, User>

const mockUsers: UserList = {
  ['foo@bar.com']: {
    id: `${+new Date()}`,
    email: 'foo@bar.com',
    password: '1234',
    full_name: 'foo@bar.com',
  },
  ['asd@asd.com']: {
    id: `${+new Date()}`,
    email: 'asd@asd.com',
    password: '1234',
    full_name: 'asd@asd.com',
  },
}

export const api = {
  findUser: (key: string) => mockUsers[key],
  getUsers: (): Promise<UserList> => {
    return new Promise(resolve => setTimeout(() => resolve(mockUsers), 1000))
  },
  addUser: (newUser: UserInput): Promise<User> => {
    return new Promise(resolve =>
      setTimeout(() => {
        mockUsers[newUser.email] = { id: `${+new Date()}`, ...newUser }
        resolve(mockUsers[newUser.email])
      }, 1000)
    )
  },
}
// Mover a api.ts

export const App = (): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  return (
    <Routes>
      <Route path={routes.home} element={<HomePage {...{ isLogged, setIsLogged, user }} />} />
      <Route path={routes.login} element={<LoginPage {...{ setIsLogged, setUser }} />} />
      <Route path={routes.register} element={<RegisterPage />} />
    </Routes>
  )
}
