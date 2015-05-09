var express = require('express');
var engine = require('ejs-mate');
var favicon = require('serve-favicon');
var fs      = require('fs');

var app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

/* Routes */

app.get('/', function (req, res) {
  var boards = fs.readdirSync(__dirname + '/views/boards/');
  res.render('index', { title: 'Sandwich', boards: boards });
});

app.get('/boards/:board', function (req, res, next) {
  fs.readFile(__dirname + '/views/boards/' + req.params.board + '.ejs', function (err, data) {
    if (err) {
      next();
    } else {
      res.render('board', { board: req.params.board });
    }
  });
});

app.use(function(req, res, next) {
  res.status(404).render('error', {
    status: '404 Not Found',
    message: "Sorry, can't find that! Are you sure that's a sandwich?"
  });
});

/* Server Set-Up */

var server = app.listen(3000, function () {
  var port = server.address().port;
  var host = server.address().address;
  if (host === '::')
    host = 'localhost';

  console.log('Heyo! Sandwich is listening at http://%s:%s', host, port);
});
