import { configDotenv } from 'dotenv'
import express from 'express'

configDotenv()

const API_PORT = process.env.API_PORT || 4000

const server = express()
server.set('port', API_PORT)

server.get('/', (req, res) => {
  res.send('LoginRegister API')
})

server.listen(API_PORT, () => {
  console.log(`Servidor escuchando en puerto ${API_PORT}`)
})
