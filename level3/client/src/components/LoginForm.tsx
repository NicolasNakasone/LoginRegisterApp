import { FormEvent, useContext } from 'react'

import { Link } from 'react-router-dom'
import { AuthenticatedUser, LoginInput } from 'src/api'
import { MemoizedLink, PasswordInput } from 'src/components/common'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'
import { ResponseError } from 'src/types'

const { VITE_API_URL } = import.meta.env

export const LoginForm = (): JSX.Element => {
  const { setUser, navigate } = useContext(UserContext)

  const { error, isLoading, setError, setIsLoading } = useFormStatus()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setError('')
    setIsLoading(true)
    e.preventDefault()

    const target = e.target as HTMLFormElement

    const email = target[0] as HTMLInputElement
    const password = target[1] as HTMLInputElement

    const loggedUser: LoginInput = {
      email: email.value,
      password: password.value,
    }
    /* TODO: Manejar errores si el server falla, un error de TypeScript 
      que pare el servidor va a hacer que las requests
      manden error y el front quede parado 
      (ej: un boton submit queda en pending)
    */
    const loginUser = await fetch(`${VITE_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(loggedUser),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    const response = (await loginUser.json()) as ResponseError

    /* Por ahora, esto me parece mejor que tener tres if
      que al final hacen practicamente lo mismo 
    */
    if (response.code) {
      email.value = ''
      password.value = ''
      setError(response.message)
      setIsLoading(false)
      return
    }

    const newUser = response as unknown as AuthenticatedUser
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
    setIsLoading(false)
    navigate(routes.home)
    return
  }

  return (
    <form onSubmit={handleLogin}>
      <input name="email" type="email" placeholder="Correo" />
      <PasswordInput />
      <button disabled={isLoading} type="submit">
        Iniciar sesión
      </button>
      <Link to={routes.recoverPassword}>¿Olvidaste tu contraseña?</Link>
      {error && <p>{error}</p>}
      <p>¿No tienes cuenta? {<MemoizedLink route={routes.register} title="Registrate" />}</p>
    </form>
  )
}
