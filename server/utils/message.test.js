const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('Tests for generateLocationMessage()', () => {
	it('Test - generate correct message', () => {
		var latitude = 21;
		var longitude = 33;
		var message = generateLocationMessage('Sender', latitude, longitude);
		expect(typeof message.from).toBe('string');
		expect(message.from.length).toBeGreaterThan(3);
		expect(typeof message.url).toBe('string');
		expect(message.url).toContain("https://www.google.com/maps?q=");
		expect(message.url).toContain(latitude.toString());
		expect(message.url).toContain(longitude.toString());
		expect(typeof message.createdAt).toBe('number');
	});
});