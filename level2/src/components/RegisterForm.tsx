import { FormEvent, memo, useContext } from 'react'

import { Link } from 'react-router-dom'
import { api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

export const RegisterForm = (): JSX.Element => {
  const { navigate } = useContext(UserContext)

  const { error, isLoading, setError, setIsLoading } = useFormStatus()

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    setError('')
    setIsLoading(true)
    e.preventDefault()

    const target = e.target as HTMLFormElement

    const full_name = target[0] as HTMLInputElement
    const email = target[1] as HTMLInputElement
    const password = target[2] as HTMLInputElement
    const re_password = target[3] as HTMLInputElement

    if (await api.findUser(email.value)) {
      full_name.value = ''
      email.value = ''
      password.value = ''
      re_password.value = ''
      setError('❌ Usuario ya registrado')
      setIsLoading(false)
      return
    }

    /* TODO: Para evitar tantos if, hacer un handleErrors que reciba
      key = 'errorName', y devuelva un true o algo si hay un error
      sino que devuelva otra cosa si todos los error checks pasaron.

      Y en handleRegister hacer un solo setIsLoading en false por ej
      No se, capaz es mas quilombo...
    */
    if (password.value !== re_password.value) {
      password.value = ''
      re_password.value = ''
      setError('❌ Contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    await api.addUser({ full_name: full_name.value, email: email.value, password: password.value })

    navigate(routes.login)
    setIsLoading(false)
    return
  }

  return (
    <form onSubmit={handleRegister}>
      <input name={'full_name'} type="text" placeholder="Nombre y apellido" />
      <input name={'email'} type="email" placeholder="Correo" />
      <input name={'password'} type="password" placeholder="Contraseña" />
      <input name={'re_password'} type="password" placeholder="Repetir contraseña" />
      <button disabled={isLoading} type="submit">
        Registrate
      </button>
      {error && <p>{error}</p>}
      <p>¿Ya tienes cuenta? {<MemoizedLink />}</p>
    </form>
  )
}

const MemoizedLink = memo((): JSX.Element => {
  return <Link to={routes.login}>Inicia sesión</Link>
})
