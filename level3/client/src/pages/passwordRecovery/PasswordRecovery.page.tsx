import { FormEvent, useState } from 'react'

import { useFormStatus } from 'src/hooks/useFormStatus.hook'

const { VITE_API_URL } = import.meta.env

export const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('')

  const { error, isLoading, setError, setIsLoading } = useFormStatus()

  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    const response = await fetch(`${VITE_API_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then(res => res.json())
    if (response.message) {
      setError(response.message)
      setIsLoading(false)
      return
    }

    setIsEmailSent(true)
    setIsLoading(false)
  }

  if (isEmailSent) return <h1>El correo fue enviado exitosamente. Revisa tu bandeja de correo</h1>

  return (
    <>
      <h1>Ingresa tu correo para poder reestablecer tu contraseña</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Correo"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <button disabled={isLoading} type="submit">
          Enviar correo
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
