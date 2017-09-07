'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = signLog;

var _ethereumjsUtil = require('ethereumjs-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signLog(node, cb) {
  // Set the identity of the logger to the signer address if it is null
  if (!this.log.identity) {
    this.log.identity = this.signerAddress;
  }

  this.signer.write((0, _stringify2.default)({
    event: 'sign_message',
    data: {
      messageHash: (0, _ethereumjsUtil.sha3)(node.key).toString('hex'),
      recoveryShare: this.recoveryShare
    }
  }));

  this.signer.on('data', function (msg) {
    var _JSON$parse = JSON.parse(msg),
        event = _JSON$parse.event,
        result = _JSON$parse.result;

    if (event == 'sign_message') {
      cb(null, (0, _stringify2.default)(result));
    }
  });
}