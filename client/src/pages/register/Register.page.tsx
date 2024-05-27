export const RegisterPage = (): JSX.Element => {
  return (
    <>
      <h1>Registrate para poder iniciar sesión</h1>
      <form /* className="flex flex-col justify-center gap-8" */>
        <input type="text" placeholder="Nombre y apellido" />
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <input type="password" placeholder="Repetir contraseña" />
      </form>
    </>
  )
}
