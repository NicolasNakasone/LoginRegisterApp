import { SetStateAction, createContext } from 'react'

import { NavigateFunction } from 'react-router-dom'
import { PublicUser } from 'src/api'

interface UserContextProps {
  isLogged: boolean
  user: PublicUser | null
  navigate: NavigateFunction
  setIsLogged(value: SetStateAction<boolean>): void
  setUser(value: SetStateAction<PublicUser | null>): void
}

export const UserContext = createContext<UserContextProps>({
  isLogged: false,
  user: null,
  setIsLogged: () => null,
  setUser: () => null,
  navigate: () => null,
})
