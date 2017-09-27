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

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _index = require('gittoken-signer/dist/client/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('gittoken-event-listener/dist/client/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./utils/index');

var _index6 = require('./sql/index');

var _index7 = require('./middleware/index');

var _index8 = require('./controllers/index');

var _index9 = require('./events/index');

var _index10 = require('./contract/index');

var _index11 = require('./router/index');

var _index12 = _interopRequireDefault(_index11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenWebHookManager = function (_GitTokenSignerClient) {
  (0, _inherits3.default)(GitTokenWebHookManager, _GitTokenSignerClient);

  function GitTokenWebHookManager(_ref) {
    var port = _ref.port,
        signerIpcPath = _ref.signerIpcPath,
        watcherIpcPath = _ref.watcherIpcPath,
        logDBPath = _ref.logDBPath,
        recoveryShare = _ref.recoveryShare,
        mysqlHost = _ref.mysqlHost,
        mysqlUser = _ref.mysqlUser,
        mysqlRootPassword = _ref.mysqlRootPassword,
        mysqlDatabase = _ref.mysqlDatabase;
    (0, _classCallCheck3.default)(this, GitTokenWebHookManager);

    // // Methods
    var _this = (0, _possibleConstructorReturn3.default)(this, (GitTokenWebHookManager.__proto__ || (0, _getPrototypeOf2.default)(GitTokenWebHookManager)).call(this, {
      signerIpcPath: signerIpcPath,
      watcherIpcPath: watcherIpcPath
    }));

    _this.signLog = _index5.signLog.bind(_this);
    _this.verifyLog = _index5.verifyLog.bind(_this);
    _this.processEvent = _index5.processEvent.bind(_this);
    _this.selectFromRegistry = _index6.selectFromRegistry.bind(_this);
    _this.insertIntoWebhook = _index6.insertIntoWebhook.bind(_this);
    _this.saveEvent = _index7.saveEvent.bind(_this);
    _this.validateOrganization = _index7.validateOrganization.bind(_this);
    _this.processRequest = _index7.processRequest.bind(_this);
    _this.webhookRouter = _index12.default.bind(_this);
    // Deprecated // this.handleWebHookEvent   = handleWebHookEvent.bind(this)
    _this.rewardContributor = _index10.rewardContributor.bind(_this);
    _this.calculateRewardBonus = _index5.calculateRewardBonus.bind(_this);
    _this.deploy = _index10.deploy.bind(_this);
    _this.pingEvent = _index9.pingEvent.bind(_this);

    // Variables
    _this.signerIpcPath = signerIpcPath;
    _this.watcherIpcPath = watcherIpcPath;
    _this.recoveryShare = recoveryShare;
    // this.deployParams         = deployParams

    // Hyperlog DAG Store
    _this.level = (0, _level2.default)(logDBPath);
    _this.log = (0, _hyperlog2.default)(_this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: _this.signerAddress,
      sign: _this.signLog,
      verify: _this.verifyLog
    });

    _this.watcher = new _index4.default({ watcherIpcPath: watcherIpcPath });

    _this.mysql = _mysql2.default.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlRootPassword,
      database: mysqlDatabase
    });

    // Express Application
    _this.app = (0, _express2.default)();

    _this.app.use((0, _cors2.default)());
    _this.app.use(_bodyParser2.default.json()); // handle json data
    _this.app.use(_bodyParser2.default.urlencoded({ extended: true })); // handle URL-encoded data
    _this.app.use('/', _this.webhookRouter());
    // this.app.get('/', this.getLoggedEvents)

    _this.app.listen(port, function () {
      console.log(_chalk2.default.hex('#210b49').bgHex('#cc5333')('GitToken Web Hook Manager Listening for Events on Port ' + port));
    });
    return _this;
  }

  return GitTokenWebHookManager;
}(_index2.default);

exports.default = GitTokenWebHookManager;