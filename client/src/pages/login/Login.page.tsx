import { FormEvent, useState } from 'react'

import { CommonPageProps } from 'src/App'

interface LoginFormValues {
  email: string
  password: string
}

const mockUsers: Record<string, { id: string; email: string; password: string } | undefined> = {
  ['foo@bar.com']: {
    id: `${+new Date()}`,
    email: 'foo@bar.com',
    password: '1234',
  },
}

export const LoginPage = ({ setIsLogged }: CommonPageProps): JSX.Element => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })

  const [isPassword, setIsPassword] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()

    const { email, password } = formValues

    const isUserRegistered = mockUsers[email]

    if (!isUserRegistered) {
      // TODO: navegar al registro
      setIsLoading(false)
      return
    }

    const isSameEmail = isUserRegistered?.email === email
    const isSamePassword = isUserRegistered?.password === password

    if (!(isSameEmail && isSamePassword)) {
      setFormValues({ email: '', password: '' })
      setIsLoading(false)
      return
    }

    // TODO: navegar al home
    setIsLoading(false)
    setIsLogged(true)
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
