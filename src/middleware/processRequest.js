import Promise from 'bluebird'
import { rewardValues, reservedValues } from 'gittoken-reward-values'

/**
 * [processRequest description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
export default function processRequest(req, res, next) {
  return new Promise((resolve, reject) => {
    const { headers, body, tokenDetails } = req

    const event = headers['x-github-event']
    const payload = JSON.parse(body['payload'])

    Promise.resolve().then(() => {
      switch(event) {
        case 'ping':
          // TODO: REFACTOR
          return this.pingEvent({ payload, headers, tokenDetails })
          break;
        case 'create':
          // payload.ref_type
          return this.rewardContributor({
            contributor: payload['sender']['login'],
            event,
            eventType: payload.ref_type,
            rewardValue: rewardValues[event][payload.ref_type],
            reservedValue: reservedValues[event][payload.ref_type],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          })
          break;
        case 'deployment_status':
          // payload.status
          return this.rewardContributor({
            contributor: payload['sender']['login'],
            event,
            eventType: payload.ref_type,
            rewardValue: rewardValues[event][payload.status],
            reservedValue: reservedValues[event][payload.status],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          })
          break;
        case 'gollum':
          return this.gollumEvent({ payload, headers })
          break;
        case 'page_build':
          // payload.build.status
          return this.rewardContributor({
            contributor: payload['sender']['login'],
            event,
            eventType: payload.build.status,
            rewardValue: rewardValues[event][payload.build.status],
            reservedValue: reservedValues[event][payload.build.status],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          })
          break;
        case 'status':
          // payload.state
          return this.rewardContributor({
            contributor: payload['sender']['login'],
            event,
            eventType: payload.state,
            rewardValue: rewardValues[event][payload.state],
            reservedValue: reservedValues[event][payload.state],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          })
          break;
        default:
          return this.rewardContributor({
            contributor: payload['sender']['login'],
            event,
            eventType: payload.action,
            rewardValue: rewardValues[event][payload.action],
            reservedValue: reservedValues[event][payload.action],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          })
      }
    }).then((receipts) => {
      req.receipts = receipts
      next()
    }).catch((error) => {
      res.status(500).send(JSON.stringify(error, null, 2));
    })
  })
}


// Determine number of pages to reward

function calcGollumReward(pages) {
  let reward = 0;

  forEach(pages, (page) => {
    reward += rewardValues[page.action]
  })

  return reward
}


function calcGollumReserve(pages) {
  let reserved = 0;

  forEach(pages, (page) => {
    reserved += reservedValues[page.action]
  })

  return reserved
}
