'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateRewardBonus;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateRewardBonus(_ref) {
  var eventDetails = _ref.eventDetails;

  return new _bluebird2.default(function (resolve, reject) {
    // TODO: Calculate Additional Reward Bonuses based on contribution analysis
    resolve(0);
  });
}