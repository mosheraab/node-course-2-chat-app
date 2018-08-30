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

	 
	objectValues(obj) {
		var res = [];
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				res.push(obj[i]);
			}
		}
		return res;
	}	

	getUsersByRoom(room) {
		// all values
		var allSessions = (Object.values)  ?
			allSessions = Object.values(this.sessions) : this.session.objectValues(this.sessions);
		
		var roomSessions = 
			allSessions.filter( (session) => (session.room === room))
		var roomUsers = roomSessions.map((session) => session.name)	
		
		// var roomUsers = [];
		// for (var session in this.sessions) {
			// console.log('session: ', session);
			// if (session.room == room)
				// roomUsers.push(session.name);
		// }
		return roomUsers;
	}
} 

module.exports.Sessions = Sessions;

