import { SetStateAction, createContext } from 'react'

import { NavigateFunction } from 'react-router-dom'
import { User } from 'src/api'

interface UserContextProps {
  isLogged: boolean
  user: User | null
  navigate: NavigateFunction
  setIsLogged(value: SetStateAction<boolean>): void
  setUser(value: SetStateAction<User | null>): void
}

export const UserContext = createContext<UserContextProps>({
  isLogged: false,
  user: null,
  setIsLogged: () => null,
  setUser: () => null,
  navigate: () => null,
})
