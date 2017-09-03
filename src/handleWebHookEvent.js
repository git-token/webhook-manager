export default function handleWebHookEvent(req, res) {
  const { headers, body } = req

  this.logWebHookEvent({ headers, body }).then((node) => {
    return this.rewardContributor({ headers, body })
  }).then((txReceipt) => {
    res.status(200).send(txReceipt);
  }).catch((error) => {
    res.status(500).send(error.message);
  })
}
