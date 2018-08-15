var socket = io(); // create socket from client to server 	

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('New incoming message event:', message);
})

// var createdMessage1 = {
	// from: "me",
	// text: "Hello to you"
// };
// var createdMessage2 = {
	// from: "me",
	// text: "Hello to you #2"
// };

// socket.emit('createdMessage', createdMessage1);
// socket.emit('createdMessage', createdMessage2);
