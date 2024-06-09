import { JSX, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AuthenticatedUser } from 'src/api'
import { UserContext } from 'src/contexts/UserContext'

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  /* TODO: Modificar este state, para que contenga isLogged dentro
    y dentro de data el user. Esto para que mas adelante se pueda
    agregar ahi el accessToken y lo que haga falta
  */
  const [user, setUser] = useState<AuthenticatedUser | null>(null)

  /* Agregar un contexto nuevo que sea algo como AuthProvider o algo asi,
    Para agregar la proteccion/redireccion de rutas y eso, y asi mover
    esos controles de cada pagina
  */
  const navigate = useNavigate()

  return (
    <UserContext.Provider value={{ isLogged, user, navigate, setIsLogged, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
