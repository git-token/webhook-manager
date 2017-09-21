'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = processRequest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [processRequest description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return [type]       [description]
 */
function processRequest(req, res, next) {
  var headers = req.headers,
      payload = req.body.payload;


  var data = JSON.parse(payload);

  req.eventDetails = {
    delivery_id: headers['x-github-delivery'],
    event: headers['x-github-event'],
    action: data['action'] ? data['action'] : '',
    organization: data['organization']['login'],
    contributor: data['sender']['login'],
    date_received: new Date().getTime()
  };

  this.processEvent({
    eventDetails: req.eventDetails,
    tokenDetails: req.tokenDetails
  }).then(function (receipts) {
    req.receipts = receipts;
    next();
  }).catch(function (error) {
    res.status(500).send((0, _stringify2.default)(error, null, 2));
  });
}