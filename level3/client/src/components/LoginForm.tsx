import { FormEvent, memo, useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { AuthenticatedUser, LoginInput } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'
import { ResponseError } from 'src/types'

export const LoginForm = (): JSX.Element => {
  const { setIsLogged, setUser, navigate } = useContext(UserContext)

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
    const loginUser = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: JSON.stringify(loggedUser),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    const response = (await loginUser.json()) as ResponseError

    /* Mas adelante cuando exista la API real y no la constante, se puede
      mandar toda la logica de validaciones como si no encontro el usuario
      o si las contraseñas coinciden (aunque para este caso es discutible,
      ya que eso creo que es mas una validacion de front, pero bueno).
      Pero en si, hay cosas que deberia encargarse el servidor/API y devolver
      la respuesta o error, y dejar al front solo con responsabilidades como
      limpiar el formulario, actualizar estados, etc.
    */

    /* Por ahora, esto me parece mejor que tener tres if
      que al final hacen practicamennte lo mismo 
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
    setIsLogged(true)
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
      {error && <p>{error}</p>}
      <p>¿No tienes cuenta? {<MemoizedLink />}</p>
    </form>
  )
}

const PasswordInput = memo((): JSX.Element => {
  const [isPassword, setIsPassword] = useState(true)
  const togglePassword = () => {
    setIsPassword(prevPassword => !prevPassword)
  }
  return (
    <>
      <input name="password" type={isPassword ? 'password' : 'text'} placeholder="Contraseña" />
      <button type="button" onClick={togglePassword}>
        {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
      </button>
    </>
  )
})

const MemoizedLink = memo((): JSX.Element => {
  return <Link to={routes.register}>Registrate</Link>
})
