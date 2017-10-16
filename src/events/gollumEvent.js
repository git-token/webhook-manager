import Promise from 'bluebird'
import { rewardValues, reservedValues } from 'gittoken-reward-values'

/**
 * [gollumEvent description]
 * @param  {[type]} payload [description]
 * @param  {[type]} headers [description]
 * @return [type]           [description]
 */
export default function gollumEvent({ payload, headers }) {
  return new Promise((resolve, reject) => {
    const { pages } = payload

    Promise.resolve(pages).map((page, i) => {
      return this.rewardContributor({
        contributor: payload['sender']['login'],
        event: 'gollum',
        eventType: payload[page.action],
        rewardValue: rewardValues['gollum'][page.action],
        reservedValue: reservedValues['gollum'][page.action],
        deliveryID: `${headers['x-github-delivery']}-${i}`,
        organization: payload['organization']['login']
      })
    }).then((receipts) => {
      resolve(receipts)
    }).catch((error) => {
      reject(error)
    })
  })
}
