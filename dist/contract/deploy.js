'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = deploy;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _split = require('split');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [deploy description]
 * @param  {[type]} tokenDetails [description]
 * @return [type]                [description]
 */
function deploy(_ref) {
  var _this = this;

  var tokenDetails = _ref.tokenDetails;

  return new _bluebird2.default(function (resolve, reject) {

    var msgID = 'deploy_contract_' + new Date().getTime();

    var payload = {
      id: msgID,
      event: 'deploy_contract',
      data: {
        params: [tokenDetails['admin_address'], tokenDetails['name'], tokenDetails['admin_username'], tokenDetails['organization'], tokenDetails['symbol'], tokenDetails['decimals']],
        organization: tokenDetails['organization'],
        recoveryShare: _this.recoveryShare
      }

      // console.log('payload', payload)
    };_this.signer.write((0, _stringify2.default)(payload));

    _this.signer.on('data', function (msg) {
      var _JSON$parse = JSON.parse(msg.toString('utf8')),
          event = _JSON$parse.event,
          result = _JSON$parse.result,
          id = _JSON$parse.id;

      if (event == 'deploy_contract' && msgID == id) {
        resolve(result);
      } else if (event == 'error' && msgID == id) {
        reject(result);
      }
    });
  });
}