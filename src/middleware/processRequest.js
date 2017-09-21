/**
 * [processRequest description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return [type]       [description]
 */
export default function processRequest(req, res, next) {
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

  this.processEvent({
    eventDetails: req.eventDetails,
    tokenDetails: req.tokenDetails
  }).then((receipts) => {
    req.receipts = receipts
    next()
  }).catch((error) => {
    res.status(500).send(JSON.stringify(error, null, 2));
  })
}
