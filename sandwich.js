var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {

  var port = server.address().port;
  var host = server.address().address;
  if (host === '::')
    host = 'localhost';

  console.log('Heyo! Sandwich is listening at http://%s:%s', host, port);
});
