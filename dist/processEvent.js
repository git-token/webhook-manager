'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processEvent(_ref) {
  var _this = this;

  var headers = _ref.headers,
      body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    _bluebird2.default.resolve(headers['x-github-event']).then(function (event) {
      console.log('event', event
      // Send Event to Processor
      );switch (event) {
        case 'ping':
          return _this.deploy();
          break;
        default:
          return null;
      }
    }).then(function () {
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}