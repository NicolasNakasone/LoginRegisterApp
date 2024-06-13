import React, { FormEvent, useState } from 'react'

import { Link, useSearchParams } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import { useFormStatus } from 'src/hooks/useFormStatus.hook'

const { VITE_API_URL } = import.meta.env

export const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const [newPassword, setNewPassword] = useState('')

  const token = searchParams.get('token')

  const { error, isLoading, setError, setIsLoading } = useFormStatus()

  const [isPasswordReset, setIsPasswordReset] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    const response = await fetch(`${VITE_API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
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
        <input
          type="password"
          value={newPassword}
          placeholder="Contraseña"
          required
          onChange={e => setNewPassword(e.target.value)}
        />
        <button disabled={isLoading} type="submit">
          Reestablecer contraseña
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
