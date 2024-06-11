import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { PublicUser } from 'src/types'

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env

export const refreshToken: RequestHandler = (req, res, next) => {
  try {
    const { refreshToken } = req.body
    /* Aca no es necesario porque en el front no hay validaciones
      de status para esta request, si falla en el cliente
      se devuelve el error, y se ejecuta el logout 
    */
    if (!refreshToken) res.status(401).send({ message: 'Refresh token required' })

    jwt.verify(`${refreshToken}`, JWT_REFRESH_SECRET || '87654321', (error, decodedToken) => {
      if (error?.message === 'jwt expired')
        res.status(401).send({ message: 'Refresh token expired' })

      if (error) res.status(403).send({ message: error?.message })

      const { id, email, full_name } = decodedToken as PublicUser

      const newAccessToken = jwt.sign({ id, email, full_name }, JWT_SECRET || '12345678', {
        expiresIn: '15m',
      })

      res.send({ accessToken: newAccessToken })
    })
  } catch (error) {
    next(error)
  }
}
