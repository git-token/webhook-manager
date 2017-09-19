export default function validateOrganization(req, res, next) {
  const { organization } = req.params
  const { payload } = req.body
  const { organization: { login } } = JSON.parse(payload)


  if (!organization) {
    res.status(401).send(`

      Error! The organization provided is null.

      Please set webhook url to https://webhook.gittoken.io/${login}

    `)
  } if (organization != login) {
    res.status(401).send(`

      Error! The organization provided does not match the webhook organization login.

    `)
  } else {
    this.selectFromRegistry({
      key: 'organization',
      value: organization
    }).then((organizationTokenDetails) => {
      req.tokenDetails = organizationTokenDetails
      next()
    }).catch((error) => {
      res.status(401).send(error.message)
    })
  }
}
