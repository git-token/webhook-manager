'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pingEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [pingEvent description]
 * @param  {[type]} eventDetails [description]
 * @param  {[type]} tokenDetails [description]
 * @return [type]                [description]
 */
function pingEvent(_ref) {
  var _this = this;

  var eventDetails = _ref.eventDetails,
      tokenDetails = _ref.tokenDetails;

  return new _bluebird2.default(function (resolve, reject) {
    _this.deploy({ tokenDetails: tokenDetails }).then(function (txReceipt) {
      console.log('txReceipt', txReceipt);
      return _this.rewardContributor({ eventDetails: eventDetails });
    }).then(function (txReceipt) {
      console.log('txReceipt', txReceipt);
      resolve();
    }).catch(function (error) {
      reject(error);
    });
  });
}