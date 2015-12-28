var socket = io.connect('http://localhost:8080');

var shoes = {
    left: { heel: 0, front: 0 },
    right: { heel: 0, front: 0 }
};

var isStanding = function() {

};

socket.on('left step', function(step) {
  shoes.left = step;
});

socket.on('right step', function(step) {
  shoes.right = step;
});


// Binding
new Vue({
  el: '#stepContainer',
  data: shoes
});
