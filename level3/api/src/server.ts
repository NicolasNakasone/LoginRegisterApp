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
