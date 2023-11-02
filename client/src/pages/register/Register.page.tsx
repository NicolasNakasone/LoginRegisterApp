export const RegisterPage = (): JSX.Element => {
  return (
    <form>
      <input type="text" placeholder="Nombre y apellido" />
      <input type="email" placeholder="Correo" />
      <input type="password" placeholder="Contraseña" />
      <input type="password" placeholder="Repetir contraseña" />
    </form>
  )
}
