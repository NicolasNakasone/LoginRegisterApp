/* eslint-disable no-console */
import { database } from 'src/database'
import { server } from 'src/server'

const PORT = server.get('port')

database
  .sync()
  .then(() => {
    console.log('Base de datos y tablas creadas')
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`)
    })
  })
  .catch(err => console.error('Error al sincronizar la base de datos:', err))
