'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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

var _signLog = require('./signLog');

var _signLog2 = _interopRequireDefault(_signLog);

var _verifyLog = require('./verifyLog');

var _verifyLog2 = _interopRequireDefault(_verifyLog);

var _signerAddress = require('./signerAddress');

var _signerAddress2 = _interopRequireDefault(_signerAddress);

var _logWebHookEvent = require('./logWebHookEvent');

var _logWebHookEvent2 = _interopRequireDefault(_logWebHookEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenWebHookManager = function GitTokenWebHookManager(_ref) {
  var port = _ref.port,
      signerIpcPath = _ref.signerIpcPath,
      logDBPath = _ref.logDBPath,
      recoveryShare = _ref.recoveryShare;
  (0, _classCallCheck3.default)(this, GitTokenWebHookManager);


  // Web Hook Mgr. Bound methods
  this.signLog = _signLog2.default.bind(this);
  this.verifyLog = _verifyLog2.default.bind(this);
  this.signerAddress = _signerAddress2.default.bind(this);
  this.logWebHookEvent = _logWebHookEvent2.default.bind(this);

  this.recoveryShare = recoveryShare;
  this.signer = _net2.default.connect(signerIpcPath

  // Hyperlog DAG Store
  );this.level = (0, _level2.default)(logDBPath);
  this.log = (0, _hyperlog2.default)(this.level, {
    id: 'GitToken',
    // Use GitToken Signer to sign nodes
    identity: this.signerAddress(),
    sign: this.signLog,
    verify: this.verifyLog
  }

  // Express Application
  );this.app = (0, _express2.default)();

  this.app.use((0, _cors2.default)());
  this.app.use(_bodyParser2.default.json() // handle json data
  );this.app.use(_bodyParser2.default.urlencoded({ extended: true }) // handle URL-encoded data
  );this.app.post('/', this.logWebHookEvent);

  this.app.listen(port, function () {
    console.log('GitToken Server Listening on Port ' + port);
  });
};

exports.default = GitTokenWebHookManager;