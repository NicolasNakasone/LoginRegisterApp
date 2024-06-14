import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { PublicUser } from 'src/types'

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env

export const generateAccessToken = (
  { id, email, full_name }: PublicUser,
  expiresIn: string | number | undefined = '15m'
) => {
  const accessToken = jwt.sign({ id, email, full_name }, JWT_SECRET || '12345678', {
    expiresIn,
  })
  return accessToken
}

export const generateTokens = ({ id, email, full_name }: PublicUser) => {
  const accessToken = generateAccessToken({ id, email, full_name })
  const refreshToken = jwt.sign({ id, email, full_name }, JWT_REFRESH_SECRET || '87654321', {
    expiresIn: '4h',
  })

  return { accessToken, refreshToken }
}

// Middleware para verificar el token JWT en las requests
export const authenticateToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    /* Cambie el status a 400 porque en el cliente sino entra a refrescar
      el token cuando en realidad no tiene que seguir si el token no existe.
      Otra que se puede hacer sino, es devolver el message y en el front
      si el message es 'jwt expired' recien hacer un post a /refresh-token
    */
    res.status(400).send({ message: 'Authorization header required' })
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
