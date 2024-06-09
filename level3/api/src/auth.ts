// TODO: Tipar los parametros de las funciones
import jwt from 'jsonwebtoken'
import { UserModel } from 'src/models/user.model'

const { JWT_SECRET } = process.env

export const generateToken = (user: UserModel | null) => {
  const token = jwt.sign({ id: user?.id }, JWT_SECRET || '12345678', { expiresIn: '1h' })
  return token
}

// Middleware para verificar el token JWT en las solicitudes
export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (token === null) return res.sendStatus(401)

  jwt.verify(token, JWT_SECRET || '12345678', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
