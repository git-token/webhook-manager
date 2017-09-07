import Promise from 'bluebird'

export default function processEvent({ headers, body }) {
  return new Promise((resolve, reject) => {
    Promise.resolve(headers['x-github-event']).then((event) => {
      console.log('event', event)
      // Send Event to Processor
      switch(event) {
        case 'ping':
          return this.deploy()
          break;
        default:
          return null
      }
    }).then(() => {
      resolve(true)
    }).catch((error) => {
      reject(error)
    })
  })
}
