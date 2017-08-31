'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = signerAddress;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signerAddress() {
  this.signer.write((0, _stringify2.default)({ event: 'get_address' }));
  this.signer.on('data', function (msg) {
    var _JSON$parse = JSON.parse(msg),
        event = _JSON$parse.event,
        result = _JSON$parse.result;

    if (event == 'get_address') {
      return result;
    }
  });
}