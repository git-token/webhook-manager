
/**
 * [saveEvent description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
export default function saveEvent(req, res, next) {
  const { headers, body: { payload } } = req

  const data = JSON.parse(payload)

  req.eventDetails = {
    delivery_id: headers['x-github-delivery'],
    event: headers['x-github-event'],
    action: data['action'] ? data['action'] : '',
    organization: data['organization']['login'],
    contributor: data['sender']['login'],
    date_received: new Date().getTime(),
  }

  console.log('req.eventDetails', req.eventDetails)

  this.insertIntoWebhook(req.eventDetails).then(() => {
    next()
  }).catch((error) => {
    res.status(500).send(error.message)
  })
}
