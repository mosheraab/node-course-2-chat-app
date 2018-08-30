const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Sessions} = require('./utils/sessions');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var sessions = new Sessions();

io.on('connection', (socket) => {
	console.log('New user connected' /*, JSON.stringify(socket.handshake.headers, undefined, 2) */);
	
	socket.on('joinRoom', (params, callback) => {
		console.log('User joining room: ', JSON.stringify(params, undefined, 2));
		// validation
		if (typeof params.room != 'string' ||
			typeof params.name != 'string' ||
			params.room.trim().length == 0 ||
			params.name.trim().length == 0) {
			callback('Invalid params');
		} 
				
		// join a room, and send messages
		sessions.removeSession(socket.id);
		sessions.addSession(socket.id, params.name, params.room);
		socket.join(params.room);
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room ' + params.room));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `<${params.name}> joined the chat room`));
		
		// update user list
		io.to(params.room).emit('updateUserList', sessions.getUsersByRoom(params.room));

		if (callback) // check that callback exists before calling it
			callback(); // ack to the client
	});

	socket.on('newMessage', (message, callback) => {
		console.log('Creating new message from client: ', JSON.stringify(message, undefined, 2));
		if (typeof message.text == 'string' && message.text.trim().length > 0) {
			io.to(sessions.getRoomById(socket.id))
				.emit('newMessage', generateMessage( sessions.getNameById(socket.id), message.text));
			if (callback) // check that callback exists before calling it
				callback('Message sent'); // ack to the client
		}
	});
	
	socket.on('newLocationMessage', (message, callback) => {
		console.log('Creating new message from client: ', JSON.stringify(message, undefined, 2));
		io.to(sessions.getRoomById(socket.id))
			.emit('newLocationMessage', generateLocationMessage( sessions.getNameById(socket.id), message.latitude, message.longitude));
		if (callback) // check that callback exists before calling it
			callback('Location message sent'); // ack to the client
	});

	socket.on('disconnect', () => {
		session = sessions.removeSession(socket.id);
		if (session) {
			io.to(session.room).emit('updateUserList', sessions.getUsersByRoom(session.room));
			io.to(session.room).emit('newMessage', generateMessage('Admin', `<${session.name}> left the chat room`));	
		}
		console.log('User disconnected'/*, JSON.stringify(socket.handshake.headers, undefined, 2)*/);
	});
});



// set express to listen on 3000 with static content

app.use(express.static(publicPath));
server.listen(port, () => {
	console.log("Server started on port", port);
});