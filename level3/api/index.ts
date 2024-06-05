import { server } from 'src/server'

const PORT = server.get('port')

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
