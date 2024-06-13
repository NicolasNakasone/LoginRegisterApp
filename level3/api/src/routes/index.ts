import express from 'express'
import { routes } from 'src/constants/routes'
import { loginRouter } from 'src/routes/login'
import { refreshTokenRouter } from 'src/routes/refreshToken'
import { registerRouter } from 'src/routes/register'
import { passwordRouter } from 'src/routes/resetPassword'
import { usersRouter } from 'src/routes/users'

export const router = express.Router()

router.use(routes.login, loginRouter)
router.use(routes.register, registerRouter)
router.use(routes.users, usersRouter)
router.use(routes.refreshToken, refreshTokenRouter)
// Va home, porque en el router hay handlers a diferentes rutas
router.use(routes.home, passwordRouter)

router.get('/', (req, res) => {
  res.send(`<h1>LoginRegister API<h1>`)
})
