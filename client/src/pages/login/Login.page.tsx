import { FormEvent, SetStateAction, useState } from 'react'

import { CommonPageProps, User } from 'src/App'

interface LoginPageProps {
  setUser(value: SetStateAction<User | null>): void
}

interface LoginFormValues {
  email: string
  password: string
}

const mockUsers: Record<string, { id: string; email: string; password: string }> = {
  ['foo@bar.com']: {
    id: `${+new Date()}`,
    email: 'foo@bar.com',
    password: '1234',
  },
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

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()

    const { email, password } = formValues
    const foundUser = mockUsers[email]

    if (!foundUser) {
      // TODO: navegar al registro
      setIsLoading(false)
      return
    }

    const isSameEmail = foundUser.email === email
    const isSamePassword = foundUser.password === password

    if (!(isSameEmail && isSamePassword)) {
      setFormValues({ email: '', password: '' })
      setIsLoading(false)
      return
    }

    const newUser: User = structuredClone(foundUser)
    setUser(newUser)

    await new Promise(() => setTimeout(() => setIsLogged(true), 2000))
    setIsLoading(false)
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
      </form>
    </>
  )
}
