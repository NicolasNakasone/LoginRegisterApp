import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { UserModel } from 'src/models/user.model'
import { PublicUser, ResponseError } from 'src/types'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, full_name, password: plainTextPassword } = req.body

    const existingUser = await UserModel.findOne({ where: { email } })

    if (existingUser)
      res.send({
        code: 'USER_ALREADY_EXISTS',
        message: '❌ Usuario ya registrado',
      } as ResponseError)

    const hashedPassword = await bcrypt.hash(plainTextPassword, 10)

    const newUser = await UserModel.create({ full_name, email, password: hashedPassword })

    const newPublicUser: PublicUser = {
      id: newUser.id,
      email: newUser.email,
      full_name: newUser.full_name,
    }

    res.send(newPublicUser)
  } catch (error) {
    next(error)
  }
}
