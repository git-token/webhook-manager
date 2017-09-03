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

function logWebHookEvent(_ref) {
  var _this = this;

  var headers = _ref.headers,
      body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    _this.log.add(null, (0, _stringify2.default)({ headers: headers, body: body }), function (error, node) {
      if (error) {
        reject(error);
      }
      resolve(node);
    });
  });
}