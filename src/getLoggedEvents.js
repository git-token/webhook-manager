import Promise from 'bluebird'

export default function getLoggedEvents(req, res) {
  this.log.heads({ valueEncoding: 'utf8' }, (error, heads) => {
    if (error) {
      res.status(500).send(error)
    } else {
      res.status(200).send(heads)
    }
  })
}
