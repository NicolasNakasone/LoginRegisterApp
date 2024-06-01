import { FormEvent, memo, useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { User, api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

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

    const foundUser = await api.findUser(email.value)

    /* Mas adelante cuando exista la API real y no la constante, se puede
      mandar toda la logica de validaciones como si no encontro el usuario
      o si las contraseñas coinciden (aunque para este caso es discutible,
      ya que eso creo que es mas una validacion de front, pero bueno).
      Pero en si, hay cosas que deberia encargarse el servidor/API y devolver
      la respuesta o error, y dejar al front solo con responsabilidades como
      limpiar el formulario, actualizar estados, etc.
    */
    if (!foundUser) {
      email.value = ''
      password.value = ''
      setError('❌ Usuario no registrado')
      setIsLoading(false)
      // Solo necesario el return si foundUser esta tipado como undefined
      return
    }

    const isSameEmail = foundUser.email === email.value
    const isSamePassword = foundUser.password === password.value

    if (!(isSameEmail && isSamePassword)) {
      password.value = ''
      setError('❌ Contraseña incorrecta')
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
