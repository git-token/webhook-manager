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
      resolve(receipts)
    }).catch((error) => {
      reject(error)
    })
  })
}
