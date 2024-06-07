import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
import { router } from 'src/routes'

dotenv.config()

const { API_PORT } = process.env

export const server = express()

server.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

server.set('port', API_PORT || 4001)

server.use(logger('dev'))
server.use(express.json({ limit: '50mb' }))

server.use('/', router)

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error Type Error does not include status
  const status = err.status || 500
  const message = err.message /* || err */ || 'Internal Server Error'
  console.error(err)
  res.status(status).send(message)
  next()
})
