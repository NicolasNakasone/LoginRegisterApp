import { JSX, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AuthenticatedUser } from 'src/api'
import { UserContext } from 'src/contexts/UserContext'

export const UserProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)

  /* TODO: Agregar un contexto nuevo que sea algo como AuthProvider o algo asi,
    Para agregar la proteccion/redireccion de rutas y eso, y asi mover
    esos controles de cada pagina
  */
  const navigate = useNavigate()

  return (
    <UserContext.Provider value={{ user, navigate, setUser }}>{children}</UserContext.Provider>
  )
}
