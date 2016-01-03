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

board.on("ready",function(){
  console.log("shoes ready");

  var leftFront = new five.Sensor({
    pin: "A0",
    freq: 25
  });

  var leftHeel = new five.Sensor({
    pin: "A1",
    freq: 25
  });

  io.on('connection', function (socket) {

    console.log("viewer connected");

    var leftFrontForce = 0;
    var leftHeelForce = 0;

    leftFront.scale([0,255]).on("data",function(){
      if (this.scaled != leftFrontForce) {
        leftFrontForce = this.scaled;
        socket.emit('left front step', leftFrontForce);
        /*if (leftFrontForce > 20) {
          socket.emit('left front step', leftFrontForce);
        } else {
          socket.emit('left front step', 0);
        }*/
      }
    });

    leftHeel.scale([0,255]).on("data",function(){
      if (this.scaled != leftHeelForce) {
        leftHeelForce = this.scaled;
        socket.emit('left heel step', leftHeelForce);
        /*if (leftHeelForce > 20) {
          socket.emit('left heel step', 1);
        } else {
          socket.emit('left heel step', 0);
        }*/
      }
    });
  });
});
