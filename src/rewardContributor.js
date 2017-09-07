import Promise from 'bluebird'

export default function rewardContributor ({ headers, body }) {
  return new Promise((resolve, reject) => {
    const rewardType = headers['x-github-event']
    const reservedType = body['action'] ? body['action'] : ''

    // NOTE: Consider using logged node.key for deliveryID
    const deliveryID = headers['x-github-delivery']
    const username = body['sender']['login']

    this.calculateRewardBonus({}).then((rewardBonus) => {
      const params = [ username, rewardType, reservedType, rewardBonus, deliveryID ]



      this.signer.write(JSON.stringify({
        event: 'sign_contract_transaction',
        data: {
          recoveryShare: this.recoveryShare,
          method: 'rewardContributor',
          params
        }
      }))

      this.signer.on('data', (msg) => {
        console.log('JSON.parse(msg)', JSON.parse(msg))
        const { event, result } = JSON.parse(msg)
        if (event == 'sign_contract_transaction') {
          console.log('result', result)
          resolve(result)
        } else if (event == 'error') {
          reject(result)
        }
      })

    }).catch((error) => {
      reject(error)
    })
  })
}
