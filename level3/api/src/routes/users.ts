import express from 'express'
import { authenticateToken } from 'src/authentication'
import { UserModel } from 'src/models/user.model'
import { PublicUser, ResponseError } from 'src/types'

export const usersRouter = express.Router()

usersRouter.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params

    const foundUser = await UserModel.findOne({ where: { id } })

    if (!foundUser)
      return res.send({
        code: 'USER_NOT_FOUND_IN_DB',
        message: 'El usuario no existe en la base de datos',
      } as ResponseError)

    const publicUser: PublicUser = {
      id: foundUser.id,
      email: foundUser.email,
      full_name: foundUser.full_name,
    }

    res.status(200).send(publicUser)
  } catch (error) {
    next(error)
  }
})
