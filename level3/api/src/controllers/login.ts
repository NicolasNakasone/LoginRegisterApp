import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { userList } from 'src/mocks/userList'
import { PublicUser, ResponseError } from 'src/types'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password: plainTextPassword } = req.body

    const foundUser = userList[email]

    if (!foundUser)
      res.send({ code: 'USER_NOT_EXISTS', message: '❌ Usuario no registrado' } as ResponseError)

    const isSameEmail = foundUser.email === email
    const isSamePassword = await bcrypt.compare(plainTextPassword, foundUser.password)

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

    const id = userList[email].id
    const full_name = userList[email].full_name

    const newPublicUser: PublicUser = { id, email, full_name }

    res.send(newPublicUser)
  } catch (error) {
    next(error)
  }
}
