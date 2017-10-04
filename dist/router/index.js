'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = webhookRouter;

var _express = require('express');

function webhookRouter() {
  var router = (0, _express.Router)();

  router.param('organization', this.validateOrganization);
  router.post('/:organization', this.processRequest, this.saveEvent, this.handleWebHookEvent);

  return router;
}