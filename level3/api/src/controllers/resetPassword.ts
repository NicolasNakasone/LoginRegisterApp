import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from 'src/models/user.model'
import { PublicUser, ResponseError } from 'src/types'
import { sendResetPasswordEmail } from 'src/utils/mailer'

const { JWT_SECRET = '12345678' } = process.env

export const requestPasswordReset: RequestHandler = async (req, res, next) => {
  try {
    const { email: emailFromClient } = req.body
    const existingUser = await UserModel.findOne({ where: { email: emailFromClient } })

    if (!existingUser) {
      return res.status(404).send({
        code: 'USER_NOT_EXISTS',
        message: '❌ Usuario no registrado',
      } as ResponseError)
    }

    const mappedUser: PublicUser = {
      id: existingUser.id,
      email: existingUser.email,
      full_name: existingUser.full_name,
    }

    const token = jwt.sign(mappedUser, JWT_SECRET, { expiresIn: '1h' })

    const mailSent = await sendResetPasswordEmail(emailFromClient, token)

    if (!mailSent.messageId)
      res.status(403).send({ message: '❌ Ocurrió un error al enviar el mail' })

    res.send(mailSent)
  } catch (error) {
    next(error)
  }
}

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body

    if (!token) res.status(400).send({ message: 'Token required' })

    const userDecoded = jwt.verify(token, JWT_SECRET) as PublicUser

    const existingUser = await UserModel.findByPk(userDecoded.id)
    if (!existingUser) return res.status(404).send({ message: 'User not found' })

    existingUser.password = await bcrypt.hash(newPassword, 10)
    await existingUser.save()

    const newPublicUser: PublicUser = {
      id: existingUser.id,
      email: existingUser.email,
      full_name: existingUser.full_name,
    }

    res.send(newPublicUser)
  } catch (error) {
    next(error)
  }
}
