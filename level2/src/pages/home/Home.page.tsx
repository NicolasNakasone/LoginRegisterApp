import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { User } from 'src/api'
import { CommonPageProps } from 'src/App'
import { routes } from 'src/constants/routes'

interface HomePageProps extends CommonPageProps {
  isLogged: boolean
  user: User | null
}

export const HomePage = ({ isLogged, setIsLogged, user }: HomePageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

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
