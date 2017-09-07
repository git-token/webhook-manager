'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = deploy;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deploy() {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    console.log('deploy contract');
    _this.signer.write((0, _stringify2.default)({
      event: 'deploy_contract',
      data: {
        params: [_this.deployParams.contributor, _this.deployParams.name, _this.deployParams.username, _this.deployParams.organization, _this.deployParams.symbol, _this.deployParams.decimals],
        recoveryShare: _this.recoveryShare
      }
    }));

    _this.signer.on('data', function (msg) {
      var _JSON$parse = JSON.parse(msg),
          event = _JSON$parse.event,
          result = _JSON$parse.result;

      if (event == 'deploy_contract') {
        resolve(result);
      } else if (event == 'error') {
        reject(result);
      }
    });
  });
}