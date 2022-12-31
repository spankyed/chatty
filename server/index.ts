import Hapi from '@hapi/hapi'
import prisma from './plugins/prisma'
import users from './plugins/users'
import posts from './plugins/posts'

// examples
// https://github.com/USA-RedDragon/RHM/tree/master/server
// https://github.com/LuckyOkoedion/rest-api-with-hapi-typescript-prisma-and-postgresql/tree/main/src
// https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-hapi/src

// todo install nodemon, jwt auth,


const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
})

export async function start(): Promise<Hapi.Server> {
  await server.register([prisma, users, posts])
  await server.start()
  return server
}

process.on('unhandledRejection', async (err) => {
  await server.app.prisma.$disconnect()
  console.log(err)
  process.exit(1)
})

start().then((server) => {
  console.log(`
  🚀 Server ready at: ${server.info.uri}
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-hapi#3-using-the-rest-api
  `)
}).catch((err) => {
  console.log(err)
})