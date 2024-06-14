import { useContext, useEffect } from 'react'

import { api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

export const HomePage = (): JSX.Element => {
  const { user, setUser, navigate } = useContext(UserContext)

  const { isLoading, setIsLoading } = useFormStatus()

  const setUserFromStorage = async () => {
    // Para evitar ejecutar todo el codigo si el user ya esta seteado
    if (user) return

    /* Fetch a la API para verificar que el usuario no haya sido borrado 
      o el accessToken haya expirado
    */
    const foundUser = await api.getUser()
    if (!foundUser) {
      handleLogout()
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
    setIsLoading(false)
    navigate(routes.login)
    return
  }

  if (!user) return <p>Cargando...</p>

  return (
    <>
      <h1>Bienvenido {user?.userData.full_name}</h1>
      <button disabled={isLoading} onClick={handleLogout}>
        Cerrar sesion
      </button>
    </>
  )
}
