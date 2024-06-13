import express from 'express'
import { routes } from 'src/constants/routes'
import { requestPasswordReset, resetPassword } from 'src/controllers/resetPassword'

export const passwordRouter = express.Router()

passwordRouter.post(routes.forgotPassword, requestPasswordReset)
passwordRouter.post(routes.resetPassword, resetPassword)
