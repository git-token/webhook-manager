'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveEvent;
function saveEvent(req, res, next) {
  var headers = req.headers,
      body = req.body;


  console.log('headers', headers);
  console.log('body', body);

  req.eventDetails = {
    delivery_id: headers['x-github-delivery'],
    event: headers['x-github-event'],
    action: body['action'] ? body['action'] : '',
    request_url: headers['requestUrl'],
    organization: body['organization']['login'],
    contributor: body['sender']['login'],
    date_received: new Date().getTime()
  };

  this.insertIntoWebhook(req.eventDetails).then(function () {
    next();
  }).catch(function (error) {
    res.status(500).send(error.message);
  });
}