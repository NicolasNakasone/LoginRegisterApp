import React, { FormEvent, useState } from 'react'

import { Link, useSearchParams } from 'react-router-dom'
import { PasswordInput } from 'src/components/common'
import { routes } from 'src/constants/routes'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

const { VITE_API_URL } = import.meta.env

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  // const [newPassword, setNewPassword] = useState('')

  const token = searchParams.get('token')

  const { error, isLoading, setError, setIsLoading } = useFormStatus()

  const [isPasswordReset, setIsPasswordReset] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    const target = event.target as HTMLFormElement

    const newPassword = target[0] as HTMLInputElement

    const response = await fetch(`${VITE_API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword: newPassword.value }),
    }).then(res => res.json())

    if (!response.id) {
      setError(response.message)
      setIsLoading(false)
      return
    }

    setIsPasswordReset(true)
    setIsLoading(false)
  }

  if (isPasswordReset)
    return (
      <h1>
        La contraseña se reestableció exitosamente{' '}
        <Link to={routes.login}>haz clic para iniciar sesión</Link>
      </h1>
    )

  return (
    <>
      <h1>Ingresa una nueva contraseña para poder iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <PasswordInput />
        <button disabled={isLoading} type="submit">
          Reestablecer contraseña
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
