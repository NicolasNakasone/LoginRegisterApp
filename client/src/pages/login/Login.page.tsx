import { useState } from 'react'

const mockUsers = [
  {
    id: `${+new Date()}`,
    email: 'foo@bar.com',
    password: '1234',
  },
]

export const LoginPage = (): JSX.Element => {
  const [isPassword, setIsPassword] = useState(true)

  return (
    <>
      <h1>Inicia sesión para poder ver la app</h1>
      <form>
        <input type="text" placeholder="Correo" />
        {/* TODO: Wrappear input y button en un solo componente */}
        <input type={isPassword ? 'password' : 'text'} placeholder="Contraseña" />
        <button type="button" onClick={() => setIsPassword(!isPassword)}>
          {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
        </button>
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  )
}
