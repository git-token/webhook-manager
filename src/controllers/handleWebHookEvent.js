/**
 * [handleWebHookEvent description]
 * @param  {Object} req [description]
 * @param  {Object} res [description]
 * @return [type]       [description]
 */
export default function handleWebHookEvent(req, res) {
  // If no errors were caught within middleware server, then succesfully
  // send receipts to client
  res.status(200).send(JSON.stringify(req.receipts, null, 2));
}
