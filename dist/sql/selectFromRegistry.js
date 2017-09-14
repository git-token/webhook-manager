'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectFromRegistry;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectFromRegistry(_ref) {
  var _this = this;

  var key = _ref.key,
      value = _ref.value;

  return new _bluebird2.default(function (resolve, reject) {
    _this.mysql.query('\n      select * from registry where ' + key + '="' + value + '";\n    ', function (error, result) {
      if (error) {
        reject(error);
      }
      if (!result[0]) {
        reject('Error: Organization not registered!');
      } else {
        resolve(result[0]);
      }
    });
  });
}