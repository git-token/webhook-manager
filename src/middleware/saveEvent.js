export default function saveEvent(req, res, next) {
  const { headers, body } = req

  console.log('headers', headers)
  console.log('body', body)

  this.insertIntoWebhook(req.eventDetails).then(() => {
    req.eventDetails = {
      delivery_id: headers['x-github-delivery'],
      event: headers['x-github-event'],
      action: body['action'] ? body['action'] : '',
      request_url: headers['requestUrl'],
      organization: body['organization']['login'],
      contributor: body['sender']['login'],
      date_received: new Date().getTime(),
    }
    next()
  }).catch((error) => {
    res.status(500).send(error.message)
  })
}
