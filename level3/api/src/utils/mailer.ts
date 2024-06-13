import nodemailer from 'nodemailer'

const { CLIENT_URL, MAILER_GMAIL, MAILER_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: MAILER_GMAIL,
    pass: MAILER_PASSWORD,
  },
})

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetPasswordUrl = `${CLIENT_URL}/reestablecer-contraseña?token=${token}`
  const mailOptions = {
    from: MAILER_GMAIL,
    to: email,
    subject: 'LoginRegisterApp - Cambio de contraseña',
    html: `<p>Para cambiar tu contraseña, por favor haz clic en el siguiente link:</p>
           <a href="${resetPasswordUrl}">Cambiar contraseña</a>`,
  }

  return await transporter.sendMail(mailOptions)
}
