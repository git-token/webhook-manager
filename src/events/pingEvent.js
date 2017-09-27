import Promise from 'bluebird'

/**
 * [pingEvent description]
 * @param  {[type]} eventDetails [description]
 * @param  {[type]} tokenDetails [description]
 * @return [type]                [description]
 */
export default function pingEvent({
  eventDetails,
  tokenDetails
}) {
  return new Promise((resolve, reject) => {
    let receipts = []

    this.deploy({ tokenDetails }).then((txReceipt) => {
      receipts.push(txReceipt)
      return this.rewardContributor({ eventDetails })
    }).then((txReceipt) => {
      receipts.push(txReceipt)

      const data = {
        organization: tokenDetails['organization'],
        token: receipts[0]['contractAddress']
      }

      console.log(`Sending Data ${JSON.stringify(data)} to Event Listener`)

      // Setup Event Listener for newly deployed token
      this.watcher.eventListener.write(JSON.stringify({ type: 'WATCH_TOKEN', data }))

      resolve(receipts)
    }).catch((error) => {
      reject(error)
    })
  })
}
