"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleWebHookEvent;
function handleWebHookEvent(req, res) {
  var _this = this;

  var headers = req.headers,
      body = req.body;


  this.logWebHookEvent({ headers: headers, body: body }).then(function (node) {
    return _this.rewardContributor({ headers: headers, body: body });
  }).then(function (txReceipt) {
    res.status(200).send(txReceipt);
  }).catch(function (error) {
    res.status(500).send(error.message);
  });
}