import Promise from 'bluebird'

/**
 * [rewardContributor description]
 * @param  {[type]} eventDetails [description]
 * @return [type]                [description]
 */
export default function rewardContributor ({ eventDetails }) {
  return new Promise((resolve, reject) => {
    const msgID = `reward_contributor_${new Date().getTime()}`

    this.calculateRewardBonus({ eventDetails }).then((rewardBonus) => {
      const params = [
        eventDetails['contributor'],
        eventDetails['event'],
        eventDetails['action'],
        rewardBonus,
        eventDetails['delivery_id']
      ]

      this.signer.write(JSON.stringify({
        id: msgID,
        event: 'sign_contract_transaction',
        data: {
          recoveryShare: this.recoveryShare,
          organization: eventDetails['organization'],
          method: 'rewardContributor',
          params
        }
      }))

      this.signer.on('data', (msg) => {
        const { event, result, id } = JSON.parse(msg)
        if (event == 'sign_contract_transaction' && id == msgID) {
          resolve(result)
        } else if (event == 'error' && id == msgID) {
          reject(result)
        }
      })

    }).catch((error) => {
      reject(error)
    })
  })
}
