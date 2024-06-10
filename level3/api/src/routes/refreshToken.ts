import express from 'express'
import { refreshToken } from 'src/controllers/refreshToken'

export const refreshTokenRouter = express.Router()

refreshTokenRouter.post('/', refreshToken)
