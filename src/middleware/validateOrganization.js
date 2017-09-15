export default function validateOrganization(req, res, next) {
  const { organization } = req.params
  const { payload } = req.body



  if (!organization) {
    res.status(401).send(`

      Error! The organization provided is null.

      Please set webhook url to https://webhook.gittoken.io/${JSON.parse(payload).organization}

    `)
  } if (organization != JSON.parse(payload).organization) {
    res.status(401).send(`

      Error! The organization provided does not match the webhook organization login.

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
