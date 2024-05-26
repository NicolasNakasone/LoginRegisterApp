import { SetStateAction, useState } from 'react'

// import { Route, Routes } from 'react-router-dom'
// import { routes } from 'src/constants/routes'
import { HomePage, LoginPage /* , RegisterPage */ } from 'src/pages'

export interface CommonPageProps {
  setIsLogged: (value: SetStateAction<boolean>) => void
}

export interface User {
  id: string
  email: string
  password: string
}

export const App = (): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  if (!isLogged) return <LoginPage {...{ setIsLogged, setUser }} />

  return (
    <HomePage {...{ setIsLogged, user }} />
    // <Routes>
    //   <Route path={routes.home} element={<HomePage />} />
    //   <Route path={routes.login} element={<LoginPage />} />
    //   <Route path={routes.register} element={<RegisterPage />} />
    // </Routes>
  )
}
