import express from 'express'
import { routes } from 'src/constants/routes'
import { userList } from 'src/mocks/userList'
import { Error } from 'src/types'

export const registerRouter = express.Router()

registerRouter.get('/', (req, res) => {
  res.send(`<h1>LoginRegisterApp - ${routes.register}<h1>`)
})

registerRouter.post('/', (req, res, next) => {
  try {
    const { email, full_name, password } = req.body

    const foundUser = userList[email]

    if (foundUser)
      res.send({ code: 'USER_ALREADY_EXISTS', message: '❌ Usuario ya registrado' } as Error)

    // No tiene sentido esto ya que no existe el usuario todavia
    // En todo caso algo que se puede hacer es hashear la password
    /* Esta validacion viene del front, donde se comparan los campos
      password y re_password, pero el back no recibe re_password (y creo
      no deberia recibir)
    */
    if (password !== foundUser.password)
      res.send({ code: 'PASSWORD_NOT_MATCH', message: '❌ Contraseñas no coinciden' } as Error)

    userList[email] = { id: `${+new Date()}`, ...{ email, full_name, password } }

    res.send(userList[email])
  } catch (error) {
    next(error)
  }
})
