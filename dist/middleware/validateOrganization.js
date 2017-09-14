'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateOrganization;
function validateOrganization(req, res, next) {
  var organization = req.params.organization;

  if (!organization) {
    res.status(401).send('\n\n      Error! The organized provided is null.\n\n      Please set webhook url to https://webhook.gittoken.io/<organization>\n\n    ');
  } else {
    this.selectFromRegistry({
      key: 'organization',
      value: organization
    }).then(function (org) {
      req.tokenDetails = org;
      next();
    }).catch(function (error) {
      res.status(401).send(error.message);
    });
  }
}