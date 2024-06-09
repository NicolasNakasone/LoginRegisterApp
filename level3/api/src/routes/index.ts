import express from 'express'
import { routes } from 'src/constants/routes'
import { loginRouter } from 'src/routes/login'
import { registerRouter } from 'src/routes/register'
import { usersRouter } from 'src/routes/users'

export const router = express.Router()

router.use(routes.login, loginRouter)
router.use(routes.register, registerRouter)
router.use(routes.users, usersRouter)

router.get('/', (req, res) => {
  res.send(`<h1>LoginRegister API<h1>`)
})
