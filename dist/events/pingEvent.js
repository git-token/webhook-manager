'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = pingEvent;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [pingEvent description]
 * @param  {[type]} eventDetails [description]
 * @param  {[type]} tokenDetails [description]
 * @return [type]                [description]
 */
function pingEvent(_ref) {
  var _this = this;

  var eventDetails = _ref.eventDetails,
      tokenDetails = _ref.tokenDetails;

  return new _bluebird2.default(function (resolve, reject) {
    var receipts = [];

    _this.deploy({ tokenDetails: tokenDetails }).then(function (txReceipt) {
      receipts.push(txReceipt);
      return _this.rewardContributor({ eventDetails: eventDetails });
    }).then(function (txReceipt) {
      receipts.push(txReceipt);

      var data = {
        organization: tokenDetails['organization'],
        token: receipts[0]['contractAddress']
      };

      console.log('Sending Data ' + (0, _stringify2.default)(data) + ' to Event Listener');

      // Setup Event Listener for newly deployed token
      _this.watcher.eventListener.write((0, _stringify2.default)({ type: 'WATCH_TOKEN', data: data }));

      resolve(receipts);
    }).catch(function (error) {
      reject(error);
    });
  });
}