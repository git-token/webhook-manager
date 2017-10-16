'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateTokenValues;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _gittokenRewardValues = require('gittoken-reward-values');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateTokenValues(_ref) {
  var eventDetails = _ref.eventDetails;

  return new _bluebird2.default(function (resolve, reject) {

    /**
     * TODO: Parse event details and payload body for reward values
     */

    resolve({
      rewardValue: 0,
      reservedValue: 0
    });
  });
}