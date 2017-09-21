
/**
 * [saveEvent description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
export default function saveEvent(req, res) {
  this.insertIntoWebhook(req.eventDetails).then(() => {
    res.status(200).send(JSON.stringify(req.receipts, null, 2));
  }).catch((error) => {
    res.status(500).send(error.message)
  })
}
