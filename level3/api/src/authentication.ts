import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { PublicUser } from 'src/types'

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env

export const generateTokens = ({ id, email, full_name }: PublicUser) => {
  const accessToken = jwt.sign({ id, email, full_name }, JWT_SECRET || '12345678', {
    expiresIn: '15m',
  })
  const refreshToken = jwt.sign({ id, email, full_name }, JWT_REFRESH_SECRET || '87654321', {
    expiresIn: '4h',
  })

  return { accessToken, refreshToken }
}

// Middleware para verificar el token JWT en las requests
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).send({ message: 'Authorization header required' })
    return
  }

  const accessToken = authHeader.split(' ')[1]

  jwt.verify(accessToken, JWT_SECRET || '12345678', error => {
    if (error?.message === 'jwt expired') res.status(401).send({ message: 'Access token expired' })

    // No se si es el status/mensaje mas apropiado
    if (error) res.status(403).send({ message: error?.message })

    next()
  })
}
