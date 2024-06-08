import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { UserModel } from 'src/models/user.model'
import { PublicUser, ResponseError } from 'src/types'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password: plainTextPassword } = req.body

    const existingUser = await UserModel.findOne({ where: { email } })

    if (!existingUser) {
      res.send({ code: 'USER_NOT_EXISTS', message: '❌ Usuario no registrado' } as ResponseError)
      return
    }

    const isSameEmail = existingUser.email === email
    const isSamePassword = await bcrypt.compare(plainTextPassword, existingUser.password)

    /* No tiene sentido esto ya que para llegar aca tuvo que encontrar al user
      por medio de la key que es siempre el email, y logicamente nunca se va a
      guardar un email diferente al de la key. Esto tendria mas sentido en el
      futuro cuando se guarde en una DB con el id como key (aunque quizas ya no
      funcione asi { [key]: User })
    */
    if (!isSameEmail)
      res.send({ code: 'EMAIL_NOT_MATCH', message: '❌ Correo incorrecto' } as ResponseError)

    if (!isSamePassword)
      res.send({
        code: 'PASSWORD_NOT_MATCH',
        message: '❌ Contraseña incorrecta',
      } as ResponseError)

    const id = existingUser.id
    const full_name = existingUser.full_name

    const newPublicUser: PublicUser = { id, email, full_name }

    res.send(newPublicUser)
  } catch (error) {
    next(error)
  }
}
