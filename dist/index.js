'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var _handleWebHookEvent = require('./handleWebHookEvent');

var _handleWebHookEvent2 = _interopRequireDefault(_handleWebHookEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitTokenWebHookManager = function () {
  function GitTokenWebHookManager(_ref) {
    var _this = this;

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
    this.handleWebHookEvent = _handleWebHookEvent2.default.bind(this);
    this.signerIpcPath = signerIpcPath;

    this.recoveryShare = recoveryShare;
    this.signerConnect();

    this.signer.on('end', function () {
      console.log('Connection to GitToken Signer Closed.');
      _this.signerReconnect();
    });

    this.signer.on('error', function () {
      console.log('Connection Error to GitToken Signer.');
      _this.signerReconnect();
    }

    // Hyperlog DAG Store
    );this.level = (0, _level2.default)(logDBPath);
    this.log = (0, _hyperlog2.default)(this.level, {
      id: 'GitToken',
      // Use GitToken Signer to sign nodes
      identity: null,
      sign: this.signLog,
      verify: this.verifyLog
    }

    // Express Application
    );this.app = (0, _express2.default)();

    this.app.use((0, _cors2.default)());
    this.app.use(_bodyParser2.default.json() // handle json data
    );this.app.use(_bodyParser2.default.urlencoded({ extended: true }) // handle URL-encoded data
    );this.app.post('/', this.handleWebHookEvent);

    this.app.listen(port, function () {
      console.log('GitToken Web Hook Manager Listening for Events on Port ' + port);
    });
  }

  (0, _createClass3.default)(GitTokenWebHookManager, [{
    key: 'signerConnect',
    value: function signerConnect() {
      var _this2 = this;

      this.signer = _net2.default.connect(this.signerIpcPath);
      this.signer.on('connect', function () {
        console.log('Connected to GitToken Signer');
        _this2.signer.write((0, _stringify2.default)({ event: 'get_address' }));
        _this2.signer.on('data', function (msg) {
          var _JSON$parse = JSON.parse(msg),
              event = _JSON$parse.event,
              result = _JSON$parse.result;

          if (event == 'get_address') {
            console.log('GitToken Signer Address: ', result);
            _this2.log.identity = result;
          }
        });
      });
    }
  }, {
    key: 'signerReconnect',
    value: function signerReconnect() {
      var _this3 = this;

      console.log('Attempting to Reconnect in 15 seconds...');
      setTimeout(function () {
        console.log('Attempting to Reconnect.');
        _this3.signerConnect();
      }, 1000 * 15);
    }
  }]);
  return GitTokenWebHookManager;
}();

exports.default = GitTokenWebHookManager;