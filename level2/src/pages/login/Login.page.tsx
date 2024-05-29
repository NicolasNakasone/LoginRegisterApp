import { FormEvent, SetStateAction, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { User, api } from 'src/api'
import { CommonPageProps } from 'src/App'
import { routes } from 'src/constants/routes'

interface LoginPageProps {
  setUser(value: SetStateAction<User | null>): void
}

interface LoginFormValues {
  email: string
  password: string
}

export const LoginPage = ({
  setIsLogged,
  setUser,
}: CommonPageProps & LoginPageProps): JSX.Element => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })

  const [isPassword, setIsPassword] = useState(true)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setError('')
    setIsLoading(true)
    e.preventDefault()

    const { email, password } = formValues
    const foundUser = api.findUser(email)

    if (!foundUser) {
      setFormValues({ email: '', password: '' })
      setError('Usuario no registrado')
      setIsLoading(false)
      // Solo necesario el return si foundUser esta tipado como undefined
      return
    }

    const isSameEmail = foundUser.email === email
    const isSamePassword = foundUser.password === password

    if (!(isSameEmail && isSamePassword)) {
      setFormValues(({ email: prevEmail }) => ({ email: prevEmail, password: '' }))
      setError('Contraseña incorrecta')
      setIsLoading(false)
      return
    }

    const newUser: User = structuredClone(foundUser)
    setUser(newUser)

    await new Promise(resolve =>
      setTimeout(() => {
        resolve(null)
        setIsLogged(true)
      }, 2000)
    )
    setIsLoading(false)
    navigate(routes.home)
    return
  }

  return (
    <>
      <h1>Inicia sesión para poder ver la app</h1>
      <form onSubmit={e => handleLogin(e)}>
        <input
          name="email"
          value={formValues.email}
          type="text"
          placeholder="Correo"
          onChange={e => setFormValues(prevValues => ({ ...prevValues, email: e.target.value }))}
        />
        {/* TODO: Wrappear input y button en un solo componente */}
        <input
          name="password"
          value={formValues.password}
          type={isPassword ? 'password' : 'text'}
          placeholder="Contraseña"
          onChange={e =>
            setFormValues(prevValues => ({ ...prevValues, password: e.target.value }))
          }
        />
        <button type="button" onClick={() => setIsPassword(!isPassword)}>
          {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
        </button>
        <button disabled={isLoading} type="submit">
          Iniciar sesión
        </button>
        {error && <p>{error}</p>}
        <p>
          ¿No tienes cuenta? <Link to={routes.register}>Registrate</Link>
        </p>
      </form>
    </>
  )
}
