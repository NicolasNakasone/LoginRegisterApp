import { RequestHandler } from 'express'
import { userList } from 'src/mocks/userList'
import { Error } from 'src/types'

export const loginUser: RequestHandler = (req, res, next) => {
  try {
    const { email, password } = req.body

    const foundUser = userList[email]

    if (!foundUser)
      res.send({ code: 'USER_NOT_EXISTS', message: '❌ Usuario no registrado' } as Error)

    const isSameEmail = foundUser.email === email
    const isSamePassword = foundUser.password === password

    /* No tiene sentido esto ya que para llegar aca tuvo que encontrar al user
      por medio de la key que es siempre el email, y logicamente nunca se va a
      guardar un email diferente al de la key. Esto tendria mas sentido en el
      futuro cuando se guarde en una DB con el id como key (aunque quizas ya no
      funcione asi { [key]: User })
    */
    if (!isSameEmail)
      res.send({ code: 'EMAIL_NOT_MATCH', message: '❌ Correo incorrecto' } as Error)

    if (!isSamePassword)
      res.send({ code: 'PASSWORD_NOT_MATCH', message: '❌ Contraseña incorrecta' } as Error)

    res.send(foundUser)
  } catch (error) {
    next(error)
  }
}
