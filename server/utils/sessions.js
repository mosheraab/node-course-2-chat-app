// file for managing sessions and session
class Session {
	constructor (socketId, name, room) {
		this.socketId = socketId;
		this.name = name;
		this.room = room;
	}
}

class Sessions {
	constructor () {
		this.sessions = {};
	}

	addSession (socketId, name, room) {
		var aSession = new Session(socketId, name, room);
		this.sessions[socketId] = aSession;
		return aSession;
		// console.log('adding session for id:', aSession);
	}

	removeSession(socketId) {
		var session = this.sessions[socketId];
		if (session)
			delete this.sessions[socketId];
		return session;
	}
	
	getRoomById(socketId) {
		return this.sessions[socketId].room;
	}
	
	getNameById(socketId) {
		return this.sessions[socketId].name;
	}
	
	getUsersByRoom(room) {
		var roomSessions = 
			Object.values(this.sessions).filter( (session) => (session.room === room))
		var roomUsers = roomSessions.map((session) => session.name)	
		return roomUsers;
	}
} 

module.exports.Sessions = Sessions;

