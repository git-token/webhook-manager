export default function saveEvent(req, res, next) {
  const { headers, body } = req

  console.log('headers', headers)
  console.log('body', body)

  req.eventDetails = {
    delivery_id: headers['x-github-delivery'],
    event: headers['x-github-event'],
    action: body['action'] ? body['action'] : '',
    organization: body['organization']['login'],
    contributor: body['sender']['login'],
    date_received: new Date().getTime(),
  }

  this.insertIntoWebhook(req.eventDetails).then(() => {
    next()
  }).catch((error) => {
    res.status(500).send(error.message)
  })
}
