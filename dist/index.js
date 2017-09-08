'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _level = require('level');

var _level2 = _interopRequireDefault(_level);

var _hyperlog = require('hyperlog');

var _hyperlog2 = _interopRequireDefault(_hyperlog);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _signerClient = require('gittoken-signer/dist/signerClient');

var _signerClient2 = _interopRequireDefault(_signerClient);

var _signLog = require('./signLog');

var _signLog2 = _interopRequireDefault(_signLog);

var _verifyLog = require('./verifyLog');

var _verifyLog2 = _interopRequireDefault(_verifyLog);

var _logWebHookEvent = require('./logWebHookEvent');

var _logWebHookEvent2 = _interopRequireDefault(_logWebHookEvent);

var _handleWebHookEvent = require('./handleWebHookEvent');

var _handleWebHookEvent2 = _interopRequireDefault(_handleWebHookEvent);

var _getLoggedEvents = require('./getLoggedEvents');

var _getLoggedEvents2 = _interopRequireDefault(_getLoggedEvents);

var _rewardContributor = require('./rewardContributor');

var _rewardContributor2 = _interopRequireDefault(_rewardContributor);

var _calculateRewardBonus = require('./calculateRewardBonus');

var _calculateRewardBonus2 = _interopRequireDefault(_calculateRewardBonus);

var _processEvent = require('./processEvent');

var _processEvent2 = _interopRequireDefault(_processEvent);

var _deploy = require('./deploy');

var _deploy2 = _interopRequireDefault(_deploy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenWebHookManager = function (_GitTokenSignerClient) {
  (0, _inherits3.default)(GitTokenWebHookManager, _GitTokenSignerClient);

  function GitTokenWebHookManager(_ref) {
    var port = _ref.port,
        signerIpcPath = _ref.signerIpcPath,
        logDBPath = _ref.logDBPath,
        recoveryShare = _ref.recoveryShare,
        deployParams = _ref.deployParams;
    (0, _classCallCheck3.default)(this, GitTokenWebHookManager);

    // Methods
    var _this

    // Variables
    = (0, _possibleConstructorReturn3.default)(this, (GitTokenWebHookManager.__proto__ || (0, _getPrototypeOf2.default)(GitTokenWebHookManager)).call(this, { signerIpcPath: signerIpcPath }));

    _this.signLog = _signLog2.default.bind(_this);
    _this.verifyLog = _verifyLog2.default.bind(_this);
    _this.logWebHookEvent = _logWebHookEvent2.default.bind(_this);
    _this.handleWebHookEvent = _handleWebHookEvent2.default.bind(_this);
    _this.getLoggedEvents = _getLoggedEvents2.default.bind(_this);
    _this.rewardContributor = _rewardContributor2.default.bind(_this);
    _this.calculateRewardBonus = _calculateRewardBonus2.default.bind(_this);
    _this.processEvent = _processEvent2.default.bind(_this);
    _this.deploy = _deploy2.default.bind(_this);_this.signerIpcPath = signerIpcPath;
    _this.recoveryShare = recoveryShare;
    _this.deployParams = deployParams;

    // Hyperlog DAG Store
    _this.level = (0, _level2.default)(logDBPath);
    _this.log = (0, _hyperlog2.default)(_this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: _this.signerAddress,
      sign: _this.signLog,
      verify: _this.verifyLog
    }

    // Express Application
    );_this.app = (0, _express2.default)();

    _this.app.use((0, _cors2.default)());
    _this.app.use(_bodyParser2.default.json() // handle json data
    );_this.app.use(_bodyParser2.default.urlencoded({ extended: true }) // handle URL-encoded data
    );_this.app.post('/', _this.handleWebHookEvent);
    _this.app.get('/', _this.getLoggedEvents);

    _this.app.listen(port, function () {
      console.log(_chalk2.default.hex('#210b49').bgHex('#cc5333')('GitToken Web Hook Manager Listening for Events on Port ' + port));
    });
    return _this;
  }

  return GitTokenWebHookManager;
}(_signerClient2.default);

exports.default = GitTokenWebHookManager;