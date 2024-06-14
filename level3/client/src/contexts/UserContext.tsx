import { SetStateAction, createContext } from 'react'

import { NavigateFunction } from 'react-router-dom'
import { AuthenticatedUser } from 'src/api'

interface UserContextProps {
  user: AuthenticatedUser | null
  navigate: NavigateFunction
  setUser(value: SetStateAction<AuthenticatedUser | null>): void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => null,
  navigate: () => null,
})
