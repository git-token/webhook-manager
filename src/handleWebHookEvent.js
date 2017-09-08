export default function handleWebHookEvent(req, res) {
  const { headers, body } = req
  console.log('headers, body', headers, body)
  this.logWebHookEvent({ headers, body }).then((node) => {
    return this.processEvent({ headers, body })
  }).then(() => {
    return this.rewardContributor({ headers, body })
  }).then((txReceipt) => {
    res.status(200).send(txReceipt);
  }).catch((error) => {
    res.status(500).send(error);
  })
}
