import { server } from 'server'

const PORT = server.get('port')

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`)
})
