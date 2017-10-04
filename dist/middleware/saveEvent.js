"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveEvent;

/**
 * [saveEvent description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
function saveEvent(req, res, next) {
  // Save event details
  this.insertIntoWebhook(req.eventDetails).then(function () {
    next();
  }).catch(function (error) {
    res.status(500).send(error.message);
  });
}