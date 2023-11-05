import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'

dotenv.config()

const { API_PORT } = process.env

const server = express()

server.set('port', API_PORT || 4001)
server.use(logger('dev'))

server.get('/', (req, res) => {
  res.send(`<h1>LoginRegisterApp<h1>`)
})

export default server
