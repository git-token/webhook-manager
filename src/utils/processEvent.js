import Promise from 'bluebird'

/**
 * [processEvent description]
 * @param  {Object} eventDetails [description]
 * @param  {Object} tokenDetails [description]
 * @return [type]                [description]
 */
export default function processEvent({ eventDetails, tokenDetails }) {
  return new Promise((resolve, reject) => {
    Promise.resolve().then(() => {
      switch(eventDetails['event']) {
        case 'ping':
          return this.pingEvent({
            eventDetails,
            tokenDetails
          })
          break;
        default:
          return null
      }
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}
