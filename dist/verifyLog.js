'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = verifyLog;

var _ethereumjsUtil = require('ethereumjs-util');

function verifyLog(node, cb) {
  if (!node.signature || !node.identity || !node.key) {
    cb(null, false);
  }
  console.log('node', node);

  var signature = JSON.parse(node.signature);
  console.log('signature', signature);

  var v = signature.v,
      r = signature.r,
      s = signature.s;

  console.log('v, r, s', v, r, s);

  var hash = (0, _ethereumjsUtil.sha3)(node.key).toString('hex');
  console.log('hash', hash);

  var pubKey = (0, _ethereumjsUtil.ecrecover)(hash, v, r, +s);
  console.log('pubKey', pubKey);

  var match = pubKey.toString('hex') == node.identity.toString('hex');
  console.log('match', match);

  cb(null, match);
}