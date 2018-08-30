const expect = require('expect');
const {Sessions} = require('./sessions');

describe('TEST SESSIONS', () => {
	var sessions;

	beforeEach( () => {
		sessions = new Sessions();
		
		sessions.addSession('1', 'Moshe', 'Room1');
		sessions.addSession('2', 'Gilad', 'Room1');
		sessions.addSession('3', 'Yarden', 'Room1');
		sessions.addSession('4', 'Rom', 'Room2');
		sessions.addSession('5', 'Peleg', 'Room2');
	});

	it('Test - add new session', () => {
		var sessions = new Sessions();
		var socketId = '123';
		var name = 'Moshe';
		var room = 'Room1';
		
		sessions.addSession(socketId, name, room);
		expect(sessions.getRoomById(socketId)).toEqual(room);
		expect(sessions.getNameById(socketId)).toEqual(name);
	});
	
	it('Test - get users by room', () => {
		expect(sessions.getUsersByRoom('Room1').length).toEqual(3);
	});

	it('Test - get user by id', () => {
		expect(sessions.getNameById('1')).toEqual('Moshe');
	});
	
});
