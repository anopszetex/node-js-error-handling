import { createServer } from 'http'

const PORT = 3000

let count = 1
const handler = async (request, response) => {
  count++

  try {
    if(count % 2 === 0) {
      await Promise.reject('handler')
    }
  
    for await(const data of request) {
      try {
         if(count % 2 !== 0) {
           await Promise.reject('for of')
         }

        response.end()
      } catch (error) {
        console.log('a request error has happened', error)
        response.writeHead(500)
        response.write(JSON.stringify({ message: 'internal server error!' }))
        response.end()
      }
    }

  } catch (error) {
    console.error('a server error occurred', error)
    response.writeHead(500)
    response.write(JSON.stringify({ message: 'internal server error!' }))
    response.end()
  }
}

createServer(handler)
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })