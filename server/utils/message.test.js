const expect = require('expect');
var {generateMessage} = require('./message');

describe('Tests for generateMessage()', () => {
	it('Test - generate correct message', () => {
		var message = generateMessage('Sender', 'Message text');
		expect(typeof message.from).toBe('string');
		expect(message.from.length).toBeGreaterThan(3);
		expect(typeof message.text).toBe('string');
		expect(message.text.length).toBeGreaterThan(3);
		expect(typeof message.createdAt).toBe('number');
	});
});