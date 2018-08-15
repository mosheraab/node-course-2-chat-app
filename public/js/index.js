var socket = io(); // create socket from client to server 	

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	console.log('New incoming message event:', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);	
})

// var createdMessage1 = {
	// from: "me",
	// text: "Hello to you"
// };
// var createdMessage2 = {
	// from: "me",
	// text: "Hello to you #2"
// };

// socket.emit('createdMessage', createdMessage1, function (data) {
	// console.log('createdMessage ack recieved from server for: ', createdMessage1, ' Return data: ', data);
// });
// socket.emit('createdMessage', createdMessage2);

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	socket.emit('createdMessage', {
		from: jQuery('[name=user]').val(),
		text: jQuery('[name=message]').val()
	}, function (data) {
		// console.log('Ack recieved: ', data);
		var li = jQuery('<li></li>');
		li.text(`<me>: ${jQuery('[name=message]').val()}`);
		jQuery('#messages').append(li);	
	});
});