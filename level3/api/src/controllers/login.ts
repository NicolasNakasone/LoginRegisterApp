import bcrypt from 'bcrypt'
import { RequestHandler } from 'express'
import { generateTokens } from 'src/authentication'
import { UserModel } from 'src/models/user.model'
import { AuthenticatedUser, ResponseError } from 'src/types'

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password: plainTextPassword } = req.body

    if (!email || !plainTextPassword)
      return res.status(400).send({
        message: '❌ Las credenciales son requeridas',
      })

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

      Edit: Igual sigue siendo al vicio, porque el id no se usa para obtener al usuario
      Se sigue usando el email que tiene del body en la request, entonces si o si
      al encontrar al usuario, logicamente el usuario existe, por ende el email
      nunca va a ser diferente (existingUser.email !== email)
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

    const generatedTokens = generateTokens({ id, email, full_name })

    const newPublicUser: AuthenticatedUser = {
      userData: { id, email, full_name },
      accessToken: generatedTokens.accessToken,
      refreshToken: generatedTokens.refreshToken,
    }

    res.send(newPublicUser)
  } catch (error) {
    next(error)
  }
}
