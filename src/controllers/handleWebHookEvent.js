/**
 * [handleWebHookEvent description]
 * @param  {Object} req [description]
 * @param  {Object} res [description]
 * @return [type]       [description]
 */
export default function handleWebHookEvent(req, res) {
  this.processEvent({
    eventDetails: req.eventDetails,
    tokenDetails: req.tokenDetails
  }).then((result) => {
    res.status(200).send(result);
  }).catch((error) => {
    res.status(500).send(error.message);
  })
}
