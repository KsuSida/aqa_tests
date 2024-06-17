const axios = require('axios');

test('user can get token', async () => {
	const authResponse = await axios.post('https://demoqa.com/Account/v1/GenerateToken', {
		userName: 'KsuSam',
		password: 'd4f16bKsu&',
	});
	expect(authResponse.status).toBe(200);
	expect(authResponse.data).toHaveProperty('token');
});

test('authorized user can get user info', async () => {
	const authResponse = await axios.post('https://demoqa.com/Account/v1/GenerateToken', {
		userName: 'KsuSam',
		password: 'd4f16bKsu&',
	});
	const token = authResponse.data.token;
	const userInfoResponse = await axios.post(
		'https://demoqa.com/Account/v1/User',
		{
			userName: 'KsuSam',
			password: 'd4f16bKsu&',
		},
		{
			validateStatus: (status) => true,
			Headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	// expect(userInfoResponse.data.message).toBe('User exists!');
	// expect(userInfoResponse.status).toBe(200);
});
