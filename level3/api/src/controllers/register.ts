import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { passwordPattern } from 'src/constants/regexps'
import { UserModel } from 'src/models/user.model'
import { PublicUser, ResponseError } from 'src/types'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, full_name, password: plainTextPassword } = req.body

    if (!email || !full_name || !plainTextPassword)
      return res.status(400).send({
        message: '❌ Las credenciales son requeridas',
      })

    const existingUser = await UserModel.findOne({ where: { email } })

    if (existingUser)
      res.send({
        code: 'USER_ALREADY_EXISTS',
        message: '❌ Usuario ya registrado',
      } as ResponseError)

    if (!passwordPattern.test(plainTextPassword))
      return res.status(400).send({
        message:
          '❌ La contraseña debe tener al menos 8 caracteres que contengan: una mayúscula, una minúscula, un símbolo y un número',
      })

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
