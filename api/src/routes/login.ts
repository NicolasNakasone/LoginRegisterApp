import express from 'express'
import { routes } from 'src/constants/routes'

export const loginRouter = express.Router()

loginRouter.get('/', (req, res) => {
  res.send(`<h1>LoginRegisterApp - ${routes.login}<h1>`)
})
loginRouter.post('/', () => null)
