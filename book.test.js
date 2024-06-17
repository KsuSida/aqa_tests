const axios = require('axios');

test('GET book BookStore/v1/Books status code is 200', async () => {
	const response = await axios.get('https://demoqa.com/BookStore/v1/Books');
	expect(response.status).toBe(200);
});

test('GET book BookStore/v1/Books response have property book', async () => {
	const response = await axios.get('https://demoqa.com/BookStore/v1/Books');
	expect(response.data.books).toBeDefined();
	console.log(response.data);
});

test('GET book BookStore/v1/Books response have 8 book item', async () => {
	const response = await axios.get('https://demoqa.com/BookStore/v1/Books');
	expect(response.data.books).toHaveLength(8);
	expect(response.data.books.length).toBeLessThanOrEqual(8);
});
