'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = logWebHookEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logWebHookEvent(req, res) {
  var headers = req.headers,
      body = req.body;


  this.log.add(null, (0, _stringify2.default)({ headers: headers, body: body }), function (error, node) {
    if (error) {
      res.status(500).send(error.message);
    }
    console.log('node', node);
    res.status(200).send(node);
  });
}