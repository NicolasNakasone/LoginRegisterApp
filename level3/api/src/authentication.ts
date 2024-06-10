import jwt from 'jsonwebtoken'
import { PublicUser } from 'src/types'

const { JWT_SECRET } = process.env

export const generateTokens = ({ id, email, full_name }: PublicUser) => {
  const accessToken = jwt.sign({ id, email, full_name }, JWT_SECRET || '12345678', {
    expiresIn: '15m',
  })
  const refreshToken = jwt.sign({ id, email, full_name }, JWT_SECRET || '12345678', {
    expiresIn: '7d',
  })

  return { accessToken, refreshToken }
}

// Middleware para verificar el token JWT en las solicitudes
// export const authenticateToken: RequestHandler = (req, res, next) => {
//   const token = req.headers['authorization']
//   if (!token) return res.sendStatus(401)

//   jwt.verify(token, JWT_SECRET || '12345678', (err, user) => {
//     if (err) return res.sendStatus(403)

//     // req.user = user
//     next()
//   })
// }
