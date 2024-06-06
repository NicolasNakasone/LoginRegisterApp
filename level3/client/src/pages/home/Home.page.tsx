import { useContext, useEffect } from 'react'

import { User, UserInput, api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

export const HomePage = (): JSX.Element => {
  const { setIsLogged, user, setUser, navigate } = useContext(UserContext)

  const { isLoading, setIsLoading } = useFormStatus()

  const setUserFromStorage = async () => {
    // Para evitar ejecutar todo el codigo si el user ya esta seteado
    if (user) return

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

  const testAPI = async (route: 'login' | 'register') => {
    const mockUser: UserInput = {
      email: 'asd@asd.com',
      full_name: 'asd@asd.com',
      password: 'asd',
    }
    const response = await fetch(`http://localhost:3000/${route}`, {
      method: 'POST',
      body: JSON.stringify(mockUser),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
  }

  if (!user) return <p>Cargando...</p>

  return (
    <>
      <h1>Bienvenido {user?.email}</h1>
      <button onClick={() => testAPI('register')}>Test API /register</button>
      <button onClick={() => testAPI('login')}>Test API /login</button>
      <button disabled={isLoading} onClick={handleLogout}>
        Cerrar sesion
      </button>
    </>
  )
}
