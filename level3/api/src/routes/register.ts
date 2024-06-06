import express from 'express'
import { routes } from 'src/constants/routes'
import { registerUser } from 'src/controllers/register'

export const registerRouter = express.Router()

registerRouter.get('/', (req, res) => {
  res.send(`<h1>LoginRegisterApp - ${routes.register}<h1>`)
})

registerRouter.post('/', registerUser)
