// No se si sera necesaria realmente, quizas una para getear users...
import express from 'express'
import { userList } from 'src/mocks/userList'

export const userRouter = express.Router()

userRouter.get('/:key', async (req, res, next) => {
  try {
    const { key } = req.params

    res.send(userList[key])
  } catch (error) {
    next(error)
  }
})
