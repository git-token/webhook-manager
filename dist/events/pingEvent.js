'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

  var payload = _ref.payload,
      headers = _ref.headers,
      tokenDetails = _ref.tokenDetails;

  return new _bluebird2.default(function (resolve, reject) {
    var receipts = [];

    _this.deploy({ tokenDetails: tokenDetails }).then(function (txReceipt) {
      receipts.push(txReceipt);
      return _this.rewardContributor({
        contributor: payload['sender']['login'],
        event: 'ping',
        eventType: '',
        rewardValue: rewardValues['ping'],
        reservedValue: reservedValues['ping'],
        deliveryID: headers['x-github-delivery'],
        organization: payload['organization']['login']
      });
    }).then(function (txReceipt) {
      receipts.push(txReceipt);

      /*
      NOTE: Consider removing Listener Service from Webhook process.
       const data = {
        organization: tokenDetails['organization'],
        token: receipts[0]['contractAddress']
      }
       console.log(`Sending Data ${JSON.stringify(data)} to Event Listener`)
       // Setup Event Listener for newly deployed token
      this.watcher.eventListener.write(JSON.stringify({ type: 'WATCH_TOKEN', data }))
       */

      resolve(receipts);
    }).catch(function (error) {
      reject(error);
    });
  });
}