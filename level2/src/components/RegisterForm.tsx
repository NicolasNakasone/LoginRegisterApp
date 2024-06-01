import { ChangeEvent, FormEvent, memo, useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { UserInput, api } from 'src/api'
import { routes } from 'src/constants/routes'
import { UserContext } from 'src/contexts/UserContext'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

interface RegisterFormValues extends UserInput {
  re_password: string
}

const initialFormValues: RegisterFormValues = {
  full_name: '',
  email: '',
  password: '',
  re_password: '',
}

export const RegisterForm = (): JSX.Element => {
  const { navigate } = useContext(UserContext)

  const [formValues, setFormValues] = useState<RegisterFormValues>(initialFormValues)

  const { error, isLoading, setError, setIsLoading } = useFormStatus()

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    setError('')
    setIsLoading(true)
    e.preventDefault()

    const { email, full_name, password, re_password } = formValues

    if (await api.findUser(email)) {
      setError('❌ Usuario ya registrado')
      setFormValues(initialFormValues)
      setIsLoading(false)
      return
    }

    /* TODO: Para evitar tantos if, hacer un handleErrors que reciba
      key = 'errorName', y devuelva un true o algo si hay un error
      sino que devuelva otra cosa si todos los error checks pasaron.

      Y en handleRegister hacer un solo setIsLoading en false por ej
      No se, capaz es mas quilombo...
    */
    if (password !== re_password) {
      setError('❌ Contraseñas no coinciden')
      setFormValues(prevValues => ({ ...prevValues, password: '', re_password: '' }))
      setIsLoading(false)
      return
    }

    await api.addUser({ full_name, email, password })

    navigate(routes.login)
    setIsLoading(false)
    return
  }

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        name={'full_name'}
        value={formValues.full_name}
        type="text"
        placeholder="Nombre y apellido"
        onChange={handleChangeValue}
      />
      <input
        name={'email'}
        value={formValues.email}
        type="email"
        placeholder="Correo"
        onChange={handleChangeValue}
      />
      <input
        name={'password'}
        value={formValues.password}
        type="password"
        placeholder="Contraseña"
        onChange={handleChangeValue}
      />
      <input
        name={'re_password'}
        value={formValues.re_password}
        type="password"
        placeholder="Repetir contraseña"
        onChange={handleChangeValue}
      />
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
