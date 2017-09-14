export default function validateOrganization(req, res, next) {
  const { organization } = req.params
  if (!organization) {
    res.status(401).send(`

      Error! The organized provided is null.

      Please set webhook url to https://webhook.gittoken.io/<organization>

    `)
  } else {
    this.selectFromRegistry({
      key: 'organization',
      value: organization
    }).then((org) => {
      req.tokenDetails = org
      next()
    }).catch((error) => {
      res.status(401).send(error.message)
    })
  }
}
