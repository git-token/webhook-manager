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
    this.deploy({ tokenDetails }).then((txReceipt) => {
      console.log('txReceipt', txReceipt)
      return this.rewardContributor({ eventDetails })
    }).then((txReceipt) => {
      console.log('txReceipt', txReceipt)
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
