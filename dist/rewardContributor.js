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

  var headers = _ref.headers,
      body = _ref.body;

  return new _bluebird2.default(function (resolve, reject) {
    var rewardType = headers['x-github-event'];
    var reservedType = body['action'] ? body['action'] : '';

    // NOTE: Consider using logged node.key for deliveryID
    var deliveryID = headers['x-github-delivery'];
    var username = body['sender']['login'];

    _this.calculateRewardBonus({}).then(function (rewardBonus) {
      var params = [username, rewardType, reservedType, rewardBonus, deliveryID];

      _this.signer.write((0, _stringify2.default)({
        event: 'sign_contract_transaction',
        data: {
          recoveryShare: _this.recoveryShare,
          method: 'rewardContributor',
          params: params
        }
      }));

      _this.signer.on('data', function (msg) {
        console.log('JSON.parse(msg)', JSON.parse(msg));

        var _JSON$parse = JSON.parse(msg),
            event = _JSON$parse.event,
            result = _JSON$parse.result;

        if (event == 'sign_contract_transaction') {
          console.log('result', result);
          resolve(result);
        } else if (event == 'error') {
          reject(result);
        }
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}