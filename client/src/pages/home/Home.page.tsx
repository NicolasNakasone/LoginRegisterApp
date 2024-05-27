import { useState } from 'react'
import { CommonPageProps, User } from 'src/App'

interface HomePageProps extends CommonPageProps {
  user: User | null
}

export const HomePage = ({ setIsLogged, user }: HomePageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    await new Promise(() => setTimeout(() => setIsLogged(false), 2000))
    setIsLoading(false)
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
