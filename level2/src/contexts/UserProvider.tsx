import { JSX, useState } from 'react'

import { User } from 'src/api'
import { UserContext } from 'src/contexts/UserContext'

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  return (
    <UserContext.Provider value={{ isLogged, user, setIsLogged, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
