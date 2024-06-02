import { useContext, useEffect } from 'react'

import { User } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

export const HomePage = (): JSX.Element => {
  const { setIsLogged, user, setUser, navigate } = useContext(UserContext)

  const { isLoading, setIsLoading } = useFormStatus()

  const asyncSetUser = async () => {
    if (user) return

    let foundUser = localStorage.getItem('user')
    if (!foundUser) {
      navigate(routes.login)
      return
    }
    foundUser = JSON.parse(foundUser)
    return await new Promise(resolve => {
      setTimeout(() => setUser(foundUser as unknown as User), 1000)
      resolve(null)
    })
  }

  useEffect(() => {
    asyncSetUser()
  }, [])

  const handleLogout = async () => {
    setIsLoading(true)
    await new Promise(resolve =>
      setTimeout(() => {
        localStorage.removeItem('user')
        resolve(null)
      }, 2000)
    )
    setUser(null)
    setIsLogged(false)
    setIsLoading(false)
    navigate(routes.login)
    return
  }

  if (!user) return <p>Cargando...</p>

  return (
    <>
      <h1>Bienvenido {user?.email}</h1>
      <button disabled={isLoading} onClick={handleLogout}>
        Cerrar sesion
      </button>
    </>
  )
}
