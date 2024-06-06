import { RequestHandler } from 'express'
import { userList } from 'src/mocks/userList'
import { Error } from 'src/types'

export const registerUser: RequestHandler = (req, res, next) => {
  try {
    const { email, full_name, password } = req.body

    const foundUser = userList[email]

    if (foundUser)
      res.send({ code: 'USER_ALREADY_EXISTS', message: '❌ Usuario ya registrado' } as Error)

    userList[email] = { id: `${+new Date()}`, ...{ email, full_name, password } }

    res.send(userList[email])
  } catch (error) {
    next(error)
  }
}
