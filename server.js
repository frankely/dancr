var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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
  socket.emit('right step', { front: 1, heel: 1 });
});
