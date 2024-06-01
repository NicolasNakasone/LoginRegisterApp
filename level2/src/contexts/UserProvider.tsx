import { JSX, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { User } from 'src/api'
import { UserContext } from 'src/contexts/UserContext'

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  return (
    <UserContext.Provider value={{ isLogged, user, navigate, setIsLogged, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
