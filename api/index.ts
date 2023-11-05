import server from 'src/app'

const API_PORT: string | undefined = server.get('port')

server.listen(API_PORT, () => {
  console.log(`Listening at port ${API_PORT}!`)
})
