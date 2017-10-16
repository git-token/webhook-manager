import Promise from 'bluebird'

/**
 * [processEvent description]
 * @param  {Object} eventDetails [description]
 * @param  {Object} tokenDetails [description]
 * @return [type]                [description]
 */
export default function processEvent({ request, tokenDetails }) {
  return new Promise((resolve, reject) => {
    const { headers, body: { payload } } = request

    Promise.resolve().then(() => {
      switch(headers['x-github-event']) {
        case 'ping':
          return this.pingEvent({
            eventDetails,
            tokenDetails
          })
          break;
        default:
          return this.rewardContributor({
            eventDetails
          })
      }
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}
