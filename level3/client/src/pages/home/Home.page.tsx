import { useContext, useEffect } from 'react'

import { api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

export const HomePage = (): JSX.Element => {
  const { setIsLogged, user, setUser, navigate } = useContext(UserContext)

  const { isLoading, setIsLoading } = useFormStatus()

  const setUserFromStorage = async () => {
    // Para evitar ejecutar todo el codigo si el user ya esta seteado
    if (user) return

    // Revisar sesion iniciada si la base de datos se borro
    // De ultima cambiar este metodo por un fetch al server
    // revisando si el user existe en la bd
    const foundUser = await api.getUser()
    if (!foundUser) {
      navigate(routes.login)
      return
    }
    setUser(foundUser)
    return
  }

  useEffect(() => {
    setUserFromStorage()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)

    await api.logout()

    setUser(null)
    setIsLogged(false)
    setIsLoading(false)
    navigate(routes.login)
    return
  }

  if (!user) return <p>Cargando...</p>

  return (
    <>
      <h1>Bienvenido {user?.full_name}</h1>
      <button disabled={isLoading} onClick={handleLogout}>
        Cerrar sesion
      </button>
    </>
  )
}
