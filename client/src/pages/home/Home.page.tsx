import { CommonPageProps, User } from 'src/App'

interface HomePageProps extends CommonPageProps {
  user: User | null
}

export const HomePage = ({ setIsLogged, user }: HomePageProps): JSX.Element => {
  const handleLogout = async () =>
    await new Promise(() => setTimeout(() => setIsLogged(false), 2000))

  return (
    <>
      <h1>Bienvenido {user?.email}</h1>
      <button onClick={handleLogout}>Cerrar sesion</button>
    </>
  )
}
