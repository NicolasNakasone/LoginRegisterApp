import { memo, useState } from 'react'

import { Link } from 'react-router-dom'

interface PasswordInputProps {
  hasRePassword?: boolean
}

export const PasswordInput = memo(({ hasRePassword }: PasswordInputProps): JSX.Element => {
  const [isPassword, setIsPassword] = useState(true)
  const togglePassword = () => {
    setIsPassword(prevPassword => !prevPassword)
  }
  return (
    <>
      <input name="password" type={isPassword ? 'password' : 'text'} placeholder="Contraseña" />
      {hasRePassword && (
        <input
          name="re_password"
          type={isPassword ? 'password' : 'text'}
          placeholder="Repetir contraseña"
        />
      )}
      <button type="button" onClick={togglePassword}>
        {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
      </button>
    </>
  )
})

interface MemoizedLinkProps {
  title: string
  route: string
}

export const MemoizedLink = memo(({ route, title }: MemoizedLinkProps): JSX.Element => {
  return <Link to={route}>{title}</Link>
})
