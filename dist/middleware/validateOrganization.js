'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateOrganization;
function validateOrganization(req, res, next) {
  var organization = req.params.organization;
  var payload = req.body.payload;

  var _JSON$parse = JSON.parse(payload),
      login = _JSON$parse.organization.login;

  if (!organization) {
    res.status(401).send('\n\n      Error! The organization provided is null.\n\n      Please set webhook url to https://webhook.gittoken.io/' + login + '\n\n    ');
  }if (organization != login) {
    res.status(401).send('\n\n      Error! The organization provided does not match the webhook organization login.\n\n    ');
  } else {
    this.selectFromRegistry({
      key: 'organization',
      value: organization
    }).then(function (tokenDetails) {
      req.tokenDetails = tokenDetails;
      next();
    }).catch(function (error) {
      res.status(401).send(error.message);
    });
  }
}