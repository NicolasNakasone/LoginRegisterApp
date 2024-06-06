import express from 'express'
import { routes } from 'src/constants/routes'
import { loginUser } from 'src/controllers/login'

export const loginRouter = express.Router()

loginRouter.get('/', (req, res) => {
  res.send(`<h1>LoginRegister API - ${routes.login}<h1>`)
})

loginRouter.post('/', loginUser)
