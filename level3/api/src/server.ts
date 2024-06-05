import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import logger from 'morgan'
import { router } from 'src/routes'

dotenv.config()

const { API_PORT } = process.env

export const server = express()

server.set('port', API_PORT || 4001)

server.use('/', router)

server.use(logger('dev'))

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
