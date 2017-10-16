'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gollumEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _gittokenRewardValues = require('gittoken-reward-values');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [gollumEvent description]
 * @param  {[type]} payload [description]
 * @param  {[type]} headers [description]
 * @return [type]           [description]
 */
function gollumEvent(_ref) {
  var _this = this;

  var payload = _ref.payload,
      headers = _ref.headers;

  return new _bluebird2.default(function (resolve, reject) {
    var pages = payload.pages;


    _bluebird2.default.resolve(pages).map(function (page, i) {
      return _this.rewardContributor({
        contributor: payload['sender']['login'],
        event: 'gollum',
        eventType: payload[page.action],
        rewardValue: _gittokenRewardValues.rewardValues['gollum'][page.action],
        reservedValue: _gittokenRewardValues.reservedValues['gollum'][page.action],
        deliveryID: headers['x-github-delivery'] + '-' + i,
        organization: payload['organization']['login']
      });
    }).then(function (receipts) {
      resolve(receipts);
    }).catch(function (error) {
      reject(error);
    });
  });
}