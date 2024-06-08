import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

let { DB_NAME, DB_USER } = process.env
const { DB_HOST, DB_PASSWORD } = process.env

DB_NAME = DB_NAME || 'LoginRegisterDB'
DB_USER = DB_USER || 'postgres'

export const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  native: false,
})

database
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Conexión a la base de datos establecida correctamente')
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err)
  })
