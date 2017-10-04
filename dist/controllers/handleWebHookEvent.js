"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = handleWebHookEvent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [handleWebHookEvent description]
 * @param  {Object} req [description]
 * @param  {Object} res [description]
 * @return [type]       [description]
 */
function handleWebHookEvent(req, res) {
  // If no errors were caught within middleware server, then succesfully
  // send receipts to client
  res.status(200).send((0, _stringify2.default)(req.receipts, null, 2));
}