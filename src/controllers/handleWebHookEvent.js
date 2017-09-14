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
    res.status(200).send(true);
  }).catch((error) => {
    res.status(500).send(error);
  })


  res.status(200).send(req.tokenDetails)
  // const { headers, body, params } = req
  // const { organization } = params
  //
  //
  //
  // this.logWebHookEvent({ headers, body }).then((node) => {
  //   return this.processEvent({ headers, body })
  // }).then(() => {
  //   return this.rewardContributor({ headers, body })
  // }).then((txReceipt) => {
  //   res.status(200).send(txReceipt);
  // }).catch((error) => {
  //   res.status(500).send(error);
  // })
}
