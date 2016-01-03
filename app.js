var socket = io.connect('http://192.168.0.16:8080/');

var shoes = {
    left: { heel: 0, front: 0 },
    right: { heel: 0, front: 0 }
};

var isStanding = function() {

};

socket.on('left front step', function(step) {
  shoes.left.front = step;
});

socket.on('left heel step', function(step) {
  shoes.left.heel = step;
});


// Binding
new Vue({
  el: '#stepContainer',
  data: shoes
});
