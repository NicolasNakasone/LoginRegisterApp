import server from 'src/app'
import { sequelize } from 'src/database'

const API_PORT: string | undefined = server.get('port')

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected successfully!')
  server.listen(API_PORT, () => {
    console.log(`Listening at port ${API_PORT}!`)
  })
})
