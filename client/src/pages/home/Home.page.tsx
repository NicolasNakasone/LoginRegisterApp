import { CommonPageProps, User } from 'src/App'

interface HomePageProps extends CommonPageProps {
  user: User | null
}

export const HomePage = ({ setIsLogged, user }: HomePageProps): JSX.Element => {
  return (
    <>
      <h1>Bienvenido {user?.email}</h1>
      <button onClick={() => setIsLogged(false)}>Cerrar sesion</button>
    </>
  )
}
