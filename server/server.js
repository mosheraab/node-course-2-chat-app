const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const _ = require('lodash');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
	console.log('New user connected', JSON.stringify(socket.handshake.headers, undefined, 2));

	socket.emit('newMessage', {
		from: 'moshe@example.com',
		text: 'Hello. This is an email to you',
		createdAt: 123 
	});
	
	socket.on('createdMessage', (message) => {
		var checkedMessage = _.pick(message, ['from', 'text']);
		checkedMessage.createdAt = new Date();
		console.log('Creating new message from client: ', JSON.stringify(message, undefined, 2));
	});
	
	socket.on('disconnect', () => {
		console.log('User disconnected', JSON.stringify(socket.handshake.headers, undefined, 2));
	});
});



// set express to listen on 3000 with static content

app.use(express.static(publicPath));
server.listen(port, () => {
	console.log("Server started on port", port);
});