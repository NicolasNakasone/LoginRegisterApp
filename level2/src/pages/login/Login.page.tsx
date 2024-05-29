import { FormEvent, useContext, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { User, api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'

interface LoginFormValues {
  email: string
  password: string
}

export const LoginPage = (): JSX.Element => {
  const { setIsLogged, setUser } = useContext(UserContext)

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
    const foundUser = await api.findUser(email)

    /* Mas adelante cuando exista la API real y no la constante, se puede
      mandar toda la logica de validaciones como si no encontro el usuario
      o si las contraseñas coinciden (aunque para este caso es discutible,
      ya que eso creo que es mas una validacion de front, pero bueno).
      Pero en si, hay cosas que deberia encargarse el servidor/API y devolver
      la respuesta o error, y dejar al front solo con responsabilidades como
      limpiar el formulario, actualizar estados, etc.
    */
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
