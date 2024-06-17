const sum = require('./sum');

test('add 2 + 3 equal 5', () => {
	expect(sum(1, 2)).toBe(3);
});
