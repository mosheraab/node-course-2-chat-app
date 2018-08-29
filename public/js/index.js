var socket = io(); // create socket from client to server 

//
// FORMATTING
//
var formattedTime = function(time) {
	return moment(time).format('H:mm:ss');
}

//
// SOCKET EVENTS
//
socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, { 
		text: message.text,
		from: message.from,
		createdAt: formattedTime(message.createdAt)
	});
	jQuery('#messages').append(html);
})

socket.on('newLocationMessage', function (message) {
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, { 
		url: message.url,
		from: message.from,
		createdAt: formattedTime(message.createdAt)
	});
	jQuery('#messages').append(html);	
})

// Sumitting form - sending message
jQuery('#message-form').on('submit', function (event) {
	event.preventDefault(); // does not work for explorer

	var messageTextBox = jQuery('[name=message]');
	
	socket.emit('newMessage', {
		from: jQuery('[name=user]').val(),
		text: messageTextBox.val()
	}, function (data) {
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template, { 
			text: messageTextBox.val(),
			from: '<me>',
			createdAt: formattedTime(moment().valueOf())
		});
		jQuery('#messages').append(html);
		
		messageTextBox.val('');
	});
});

// Sending location
jQuery('#send-location').on('click', function (event) {
	if ("geolocation" in navigator) {
		jQuery('#send-location').attr('disabled', true).text('Sending...');
		navigator.geolocation.getCurrentPosition(function(position) {
			socket.emit('newLocationMessage', {
				from: jQuery('[name=user]').val(),
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}, function (data) {
				var template = jQuery('#message-template').html();
				var html = Mustache.render(template, { 
					from: '<me>',
					text: '@' + position.coords.latitude + ',' + position.coords.longitude,
					createdAt: formattedTime(moment().valueOf())
				});				
				jQuery('#messages').append(html);
				// console.log('Ack recieved: ', data);
				jQuery('#send-location').attr('disabled', false).text('Send Location');
			});
		}, function () { // if fetch position failed
				jQuery('#send-location').attr('disabled', false).text('Send Location');
				alert("Unable to fetch location");
		});	  
	} else {
		return alert("Geolocation - NOT supported");
	}
});


