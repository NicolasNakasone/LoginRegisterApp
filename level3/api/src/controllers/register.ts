import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { userList } from 'src/mocks/userList'
import { PublicUser, ResponseError } from 'src/types'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, full_name, password: plainTextPassword } = req.body

    const foundUser = userList[email]

    const hashedPassword = await bcrypt.hash(plainTextPassword, 10)

    if (foundUser)
      res.send({
        code: 'USER_ALREADY_EXISTS',
        message: '❌ Usuario ya registrado',
      } as ResponseError)

    const id = `${+new Date()}`

    userList[email] = { id, email, full_name, password: hashedPassword }

    const newPublicUser: PublicUser = { id, email, full_name }

    res.send(newPublicUser)
  } catch (error) {
    next(error)
  }
}
