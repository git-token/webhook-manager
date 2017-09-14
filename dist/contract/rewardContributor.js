'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = rewardContributor;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rewardContributor(_ref) {
  var _this = this;

  var eventDetails = _ref.eventDetails;

  return new _bluebird2.default(function (resolve, reject) {
    var msgID = 'reward_contributor_' + new Date().getTime();

    _this.calculateRewardBonus({ eventDetails: eventDetails }).then(function (rewardBonus) {
      var params = [eventDetails['contributor'], eventDetails['event'], eventDetails['action'], rewardBonus, eventDetails['delivery_id']];

      _this.signer.write((0, _stringify2.default)({
        id: msgID,
        event: 'sign_contract_transaction',
        data: {
          recoveryShare: _this.recoveryShare,
          organization: eventDetails['organization'],
          method: 'rewardContributor',
          params: params
        }
      }));

      _this.signer.on('data', function (msg) {
        console.log('JSON.parse(msg)', JSON.parse(msg));

        var _JSON$parse = JSON.parse(msg),
            event = _JSON$parse.event,
            result = _JSON$parse.result,
            id = _JSON$parse.id;

        if (event == 'sign_contract_transaction' && id == msgID) {
          console.log('result', result);
          resolve(result);
        } else if (event == 'error' && id == msgID) {
          reject(result);
        }
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}