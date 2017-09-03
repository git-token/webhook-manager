'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateReward;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateReward(_ref) {
  var rewardType = _ref.rewardType,
      deliveryID = _ref.deliveryID,
      contributorUsername = _ref.contributorUsername,
      rewardBonus = _ref.rewardBonus,
      reservedType = _ref.reservedType;

  return new _bluebird2.default(function (resolve, reject) {
    var params = [contributorUsername, rewardType, reservedType, rewardBonus, deliveryID];
  });
}