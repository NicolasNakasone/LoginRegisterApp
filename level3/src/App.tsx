import { SetStateAction } from 'react'

import { Route, Routes } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import { HomePage, LoginPage, RegisterPage } from 'src/pages'

export interface CommonPageProps {
  setIsLogged: (value: SetStateAction<boolean>) => void
}

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path={routes.register} element={<RegisterPage />} />
    </Routes>
  )
}
