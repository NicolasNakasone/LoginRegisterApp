// No se si sera necesaria realmente, quizas una para getear users...
import express from 'express'
import { userList } from 'src/mocks/userList'
// import { routes } from 'src/constants/routes'

export const userRouter = express.Router()

userRouter.get('/:key', async (req, res, next) => {
  try {
    const { key } = req.params
    // const foundUser = new Promise(resolve => {
    //   setTimeout(() => {
    //     const foundUser = userList[key]
    //     resolve(foundUser)
    //   }, 1000)
    // })
    // const user = await foundUser

    // res.send(user)
    res.send(userList[key])
  } catch (error) {
    next(error)
  }
})
