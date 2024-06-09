import { SetStateAction, createContext } from 'react'

import { NavigateFunction } from 'react-router-dom'
import { AuthenticatedUser } from 'src/api'

interface UserContextProps {
  isLogged: boolean
  user: AuthenticatedUser | null
  navigate: NavigateFunction
  setIsLogged(value: SetStateAction<boolean>): void
  setUser(value: SetStateAction<AuthenticatedUser | null>): void
}

export const UserContext = createContext<UserContextProps>({
  isLogged: false,
  user: null,
  setIsLogged: () => null,
  setUser: () => null,
  navigate: () => null,
})
