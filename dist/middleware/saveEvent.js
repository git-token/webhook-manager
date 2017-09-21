"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = saveEvent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [saveEvent description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
function saveEvent(req, res) {
  this.insertIntoWebhook(req.eventDetails).then(function () {
    res.status(200).send((0, _stringify2.default)(req.receipts, null, 2));
  }).catch(function (error) {
    res.status(500).send(error.message);
  });
}