'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateOrganization;
function validateOrganization(req, res, next) {
  var organization = req.params.organization;
  var payload = req.body.payload;


  console.log('req.body', req.body);
  console.log('payload', payload);

  if (!organization) {
    res.status(401).send('\n\n      Error! The organization provided is null.\n\n      Please set webhook url to https://webhook.gittoken.io/' + JSON.parse(payload).organization + '\n\n    ');
  }if (organization != payload.organization) {
    res.status(401).send('\n\n      Error! The organization provided does not match the webhook organization login.\n\n    ');
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