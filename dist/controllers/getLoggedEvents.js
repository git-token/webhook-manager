'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLoggedEvents;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoggedEvents(req, res) {
  this.log.heads({ valueEncoding: 'utf8' }, function (error, heads) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(heads);
    }
  });
}