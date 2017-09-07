'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = logWebHookEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logWebHookEvent(_ref) {
  var _this = this;

  var headers = _ref.headers,
      body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    _this.log.heads(function (error, heads) {
      if (error) {
        reject(error);
      }

      var links = [];
      var latest = heads[heads.length - 1];

      if (heads.length) {
        links = latest.links.concat(latest.key);
      }

      _this.log.add([].concat((0, _toConsumableArray3.default)(links)), (0, _stringify2.default)({ headers: headers, body: body }), function (error, node) {
        if (error) {
          reject(error);
        }
        resolve(node);
      });
    });
  });
}