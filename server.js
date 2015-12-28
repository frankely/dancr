var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var five = require("johnny-five");
var board = five.Board();

server.listen(8080);

// Http Server
app.get('/vue.js',function(req,res) {
  res.sendFile(__dirname + '/node_modules/vue/dist/vue.js');
});

app.get('/app.js',function(req,res) {
  res.sendFile(__dirname + '/app.js');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Step Processor
io.on('connection', function (socket) {
  board.on("ready",function(){

    var leftFront = new five.Sensor({
      pin: "A0",
      freq: 25
    });

    var leftFrontForce = 0;

    leftFront.scale([0,255]).on("data",function(){
      if (this.scaled != leftFrontForce) {
        leftFrontForce = this.scaled;

        if (leftFrontForce > 20) {
          socket.emit('left step', { front: 1, heel: 0 });
        } else {
          socket.emit('left step', { front: 0, heel: 0 });
        }
      }
    });
  });
});
