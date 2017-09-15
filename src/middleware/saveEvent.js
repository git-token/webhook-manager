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

  this.insertIntoWebhook(req.eventDetails).then(() => {
    next()
  }).catch((error) => {
    res.status(500).send(error.message)
  })
}
