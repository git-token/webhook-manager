'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveEvent;
function saveEvent(req, res, next) {
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

  this.insertIntoWebhook(req.eventDetails).then(function () {
    next();
  }).catch(function (error) {
    res.status(500).send(error.message);
  });
}