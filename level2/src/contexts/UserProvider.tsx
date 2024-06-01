import { JSX, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { User } from 'src/api'
import { UserContext } from 'src/contexts/UserContext'

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  /* TODO: Modificar este state, para que contenga isLogged dentro
    y dentro de data el user. Esto para que mas adelante se pueda
    agregar ahi el accessToken y lo que haga falta
  */
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  return (
    <UserContext.Provider value={{ isLogged, user, navigate, setIsLogged, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
