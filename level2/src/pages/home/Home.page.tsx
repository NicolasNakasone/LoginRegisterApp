import { useContext, useEffect } from 'react'

import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

export const HomePage = (): JSX.Element => {
  const { isLogged, setIsLogged, user, navigate } = useContext(UserContext)

  const { isLoading, setIsLoading } = useFormStatus()

  useEffect(() => {
    if (!isLogged) navigate(routes.login)
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(null)
        setIsLogged(false)
      }, 2000)
    )
    setIsLoading(false)
    navigate(routes.login)
  }

  return (
    <>
      <h1>Bienvenido {user?.email}</h1>
      <button disabled={isLoading} onClick={handleLogout}>
        Cerrar sesion
      </button>
    </>
  )
}
