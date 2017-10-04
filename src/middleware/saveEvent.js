
/**
 * [saveEvent description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
export default function saveEvent(req, res, next) {
  // Save event details
  this.insertIntoWebhook(req.eventDetails).then(() => {
    next()
  }).catch((error) => {
    res.status(500).send(error.message)
  })
}
