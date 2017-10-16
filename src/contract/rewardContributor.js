import Promise from 'bluebird'
import split from 'split'

/**
 * [rewardContributor description]
 * @param  {[type]} contributor   [description]
 * @param  {[type]} event         [description]
 * @param  {[type]} eventType     [description]
 * @param  {[type]} rewardValue   [description]
 * @param  {[type]} reservedValue [description]
 * @param  {[type]} deliveryID    [description]
 * @return [type]                 [description]
 */
export default function rewardContributor({
  contributor,
  event,
  eventType,
  rewardValue,
  reservedValue,
  deliveryID
}) {
  return new Promise((resolve, reject) => {
    const msgID = `reward_${contributor}_${new Date().getTime()}_${deliveryID}`

    try {
      const params = [
        contributor,
        event,
        eventType,
        rewardValue,
        reservedValue,
        deliveryID
      ]

      this.signer.write(JSON.stringify({
        id: msgID,
        event: 'sign_contract_transaction',
        data: {
          recoveryShare: this.recoveryShare,
          organization,
          method: 'rewardContributor',
          params
        }
      }))

      this.signer.on('data', (msg) => {
        const { event, result, id } = JSON.parse(msg.toString('utf8'))
        if (event == 'sign_contract_transaction' && id == msgID) {
          resolve(result)
        } else if (event == 'error' && id == msgID) {
          reject(result)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
