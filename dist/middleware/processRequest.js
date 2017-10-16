'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = processRequest;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _gittokenRewardValues = require('gittoken-reward-values');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [processRequest description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return [type]          [description]
 */
function processRequest(req, res, next) {
  var _this = this;

  return new _bluebird2.default(function (resolve, reject) {
    var headers = req.headers,
        body = req.body,
        tokenDetails = req.tokenDetails;


    var event = headers['x-github-event'];
    var payload = JSON.parse(body['payload']);

    _bluebird2.default.resolve().then(function () {
      switch (event) {
        case 'ping':
          // TODO: REFACTOR
          return _this.pingEvent({ payload: payload, headers: headers, tokenDetails: tokenDetails });
          break;
        case 'create':
          // payload.ref_type
          return _this.rewardContributor({
            contributor: payload['sender']['login'],
            event: event,
            eventType: payload.ref_type,
            rewardValue: _gittokenRewardValues.rewardValues[event][payload.ref_type],
            reservedValue: _gittokenRewardValues.reservedValues[event][payload.ref_type],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          });
          break;
        case 'deployment_status':
          // payload.status
          return _this.rewardContributor({
            contributor: payload['sender']['login'],
            event: event,
            eventType: payload.ref_type,
            rewardValue: _gittokenRewardValues.rewardValues[event][payload.status],
            reservedValue: _gittokenRewardValues.reservedValues[event][payload.status],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          });
          break;
        case 'gollum':
          return _this.gollumEvent({ payload: payload, headers: headers });
          break;
        case 'page_build':
          // payload.build.status
          return _this.rewardContributor({
            contributor: payload['sender']['login'],
            event: event,
            eventType: payload.build.status,
            rewardValue: _gittokenRewardValues.rewardValues[event][payload.build.status],
            reservedValue: _gittokenRewardValues.reservedValues[event][payload.build.status],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          });
          break;
        case 'status':
          // payload.state
          return _this.rewardContributor({
            contributor: payload['sender']['login'],
            event: event,
            eventType: payload.state,
            rewardValue: _gittokenRewardValues.rewardValues[event][payload.state],
            reservedValue: _gittokenRewardValues.reservedValues[event][payload.state],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          });
          break;
        default:
          return _this.rewardContributor({
            contributor: payload['sender']['login'],
            event: event,
            eventType: payload.action,
            rewardValue: _gittokenRewardValues.rewardValues[event][payload.action],
            reservedValue: _gittokenRewardValues.reservedValues[event][payload.action],
            deliveryID: headers['x-github-delivery'],
            organization: payload['organization']['login']
          });
      }
    }).then(function (receipts) {
      req.receipts = receipts;
      next();
    }).catch(function (error) {
      res.status(500).send((0, _stringify2.default)(error, null, 2));
    });
  });
}

// Determine number of pages to reward

function calcGollumReward(pages) {
  var reward = 0;

  forEach(pages, function (page) {
    reward += _gittokenRewardValues.rewardValues[page.action];
  });

  return reward;
}

function calcGollumReserve(pages) {
  var reserved = 0;

  forEach(pages, function (page) {
    reserved += _gittokenRewardValues.reservedValues[page.action];
  });

  return reserved;
}