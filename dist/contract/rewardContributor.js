'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = rewardContributor;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _split = require('split');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [rewardContributor description]
 * @param  {[type]} contributor   [description]
 * @param  {[type]} event         [description]
 * @param  {[type]} eventType     [description]
 * @param  {[type]} rewardValue   [description]
 * @param  {[type]} reservedValue [description]
 * @param  {[type]} deliveryID    [description]
 * @return [type]                 [description]
 */
function rewardContributor(_ref) {
  var _this = this;

  var contributor = _ref.contributor,
      event = _ref.event,
      eventType = _ref.eventType,
      rewardValue = _ref.rewardValue,
      reservedValue = _ref.reservedValue,
      deliveryID = _ref.deliveryID;

  return new _bluebird2.default(function (resolve, reject) {
    var msgID = 'reward_' + contributor + '_' + new Date().getTime() + '_' + deliveryID;

    try {
      var params = [contributor, event, eventType, rewardValue, reservedValue, deliveryID];

      _this.signer.write((0, _stringify2.default)({
        id: msgID,
        event: 'sign_contract_transaction',
        data: {
          recoveryShare: _this.recoveryShare,
          organization: organization,
          method: 'rewardContributor',
          params: params
        }
      }));

      _this.signer.on('data', function (msg) {
        var _JSON$parse = JSON.parse(msg.toString('utf8')),
            event = _JSON$parse.event,
            result = _JSON$parse.result,
            id = _JSON$parse.id;

        if (event == 'sign_contract_transaction' && id == msgID) {
          resolve(result);
        } else if (event == 'error' && id == msgID) {
          reject(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}