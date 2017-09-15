'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [processEvent description]
 * @param  {Object} eventDetails [description]
 * @param  {Object} tokenDetails [description]
 * @return [type]                [description]
 */
function processEvent(_ref) {
  var _this = this;

  var eventDetails = _ref.eventDetails,
      tokenDetails = _ref.tokenDetails;

  return new _bluebird2.default(function (resolve, reject) {
    _bluebird2.default.resolve().then(function () {
      switch (eventDetails['event']) {
        case 'ping':
          return _this.pingEvent({
            eventDetails: eventDetails,
            tokenDetails: tokenDetails
          });
          break;
        default:
          return _this.rewardContributor({
            eventDetails: eventDetails
          });
      }
    }).then(function (data) {
      resolve(data);
    }).catch(function (error) {
      reject(error);
    });
  });
}