import { SetStateAction, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import { User } from 'src/api'
import { routes } from 'src/constants/routes'
import { HomePage, LoginPage, RegisterPage } from 'src/pages'

export interface CommonPageProps {
  setIsLogged: (value: SetStateAction<boolean>) => void
}

export const App = (): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  return (
    <Routes>
      <Route path={routes.home} element={<HomePage {...{ isLogged, setIsLogged, user }} />} />
      <Route path={routes.login} element={<LoginPage {...{ setIsLogged, setUser }} />} />
      <Route path={routes.register} element={<RegisterPage />} />
    </Routes>
  )
}
