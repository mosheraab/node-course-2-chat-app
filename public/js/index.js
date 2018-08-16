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

socket.on('newLocationMessage', function (message) {
	console.log('New incoming message event:', message);
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">My current location</a>');
	li.text(`${message.from}: `);
    a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);	
})

// Sumitting form - sending message
jQuery('#message-form').on('submit', function (event) {
	event.preventDefault(); // does not work for explorer

	socket.emit('newMessage', {
		from: jQuery('[name=user]').val(),
		text: jQuery('[name=message]').val()
	}, function (data) {
		// console.log('Ack recieved: ', data);
		var li = jQuery('<li></li>');
		li.text(`<me>: ${jQuery('[name=message]').val()}`);
		jQuery('#messages').append(li);	
	});
});

// Sending location
jQuery('#send-location').on('click', function (event) {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			socket.emit('newLocationMessage', {
				from: jQuery('[name=user]').val(),
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}, function (data) {
				// console.log('Ack recieved: ', data);
				var li = jQuery('<li></li>');
				li.text(`<me>: @${position.coords.latitude},${position.coords.longitude}`);
				
				jQuery('#messages').append(li);	
			});
		});	  
	} else {
		return alert("Geolocation - NOT supported");
	}
});

// code for sending message for user (for any generated message)
var sendMyMessage = function (messageText) {

}

