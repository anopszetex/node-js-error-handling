import { setTimeout as timeoutAsync } from 'timers/promises'

setTimeout(async () => {
  console.log('starting process!');
  await timeoutAsync(100)
  console.count('debug')
  console.log(await Promise.resolve('timeout order'))
  await timeoutAsync(100)
  console.count('debug')
  await Promise.reject('promise rejected on timeout')
}, 1000);

const throwError = (msg) => {
  throw new Error(msg)
}

try {
  console.log('hello')
  console.log('world')
  throwError('internal server error')
} catch (error) {
  console.log('a server error occurred', error.message)
} finally {
  console.log('executed after all')
}

process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection', e.message ?? e)
})

process.on('uncaughtException', (e) => {
  console.error('uncaughtException', e.message ?? e)
})
 
Promise.reject('promise rejected')

setTimeout(async () => {
  await Promise.reject('promise rejected')
})

setTimeout(() => {
  throwError('outside of catch')
});