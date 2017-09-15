"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleWebHookEvent;
/**
 * [handleWebHookEvent description]
 * @param  {Object} req [description]
 * @param  {Object} res [description]
 * @return [type]       [description]
 */
function handleWebHookEvent(req, res) {
  this.processEvent({
    eventDetails: req.eventDetails,
    tokenDetails: req.tokenDetails
  }).then(function (result) {
    res.status(200).send(true);
  }).catch(function (error) {
    res.status(500).send(error.message);
  });
}