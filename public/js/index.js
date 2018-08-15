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

var createdMessage = {
	from: "me",
	text: "Hello to you"
};

console.log("Creating message: ", createdMessage);
socket.emit('createdMessage', createdMessage);
createdMessage.text = "2nd message text";
socket.emit('createdMessage', createdMessage);
