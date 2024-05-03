export const RegisterPage = (): JSX.Element => {
  return (
    <main
      className="w-[60vw] h-[60vh] m-auto p-4 flex items-center gap-16 border-2 border-[#FFFFFF40] rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF20',
        backdropFilter: 'blur(4px)',
        boxShadow: '0 0 12px 4px #00000040',
      }}
    >
      <section className="mx-8 flex place-items-center">
        <p>LoginRegisterApp</p>
      </section>
      <form className="flex flex-col justify-center gap-8">
        <input type="text" placeholder="Nombre y apellido" />
        <input type="email" placeholder="Correo" />
        <input type="password" placeholder="Contraseña" />
        <input type="password" placeholder="Repetir contraseña" />
      </form>
    </main>
  )
}
