"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertIntoWebhook;

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [insertIntoWebhook description]
 * @param  {String} [delivery_id=""]   [description]
 * @param  {String} [event=""]         [description]
 * @param  {String} [action=""]        [description]
 * @param  {String} [organization=""]  [description]
 * @param  {String} [contributor=""]   [description]
 * @param  {Date}   [date_received=new Date(]        [description]
 * @return [type]                      [description]
 */
function insertIntoWebhook(_ref) {
  var _this = this;

  var _ref$delivery_id = _ref.delivery_id,
      delivery_id = _ref$delivery_id === undefined ? "" : _ref$delivery_id,
      _ref$event = _ref.event,
      event = _ref$event === undefined ? "" : _ref$event,
      _ref$action = _ref.action,
      action = _ref$action === undefined ? "" : _ref$action,
      _ref$organization = _ref.organization,
      organization = _ref$organization === undefined ? "" : _ref$organization,
      _ref$contributor = _ref.contributor,
      contributor = _ref$contributor === undefined ? "" : _ref$contributor,
      _ref$date_received = _ref.date_received,
      date_received = _ref$date_received === undefined ? new Date().getTime() : _ref$date_received;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query("\n      INSERT INTO webhook (\n        delivery_id,\n        event,\n        action,\n        organization,\n        contributor,\n        date_received\n      ) VALUES (\n        \"" + delivery_id + "\",\n        \"" + event + "\",\n        \"" + action + "\",\n        \"" + organization + "\",\n        \"" + contributor + "\",\n        " + date_received + "\n      )\n    ", function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}