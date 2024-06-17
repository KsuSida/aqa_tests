const axios = require('axios');

const axiosInstanse = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
	timeout: 1000,
	validateStatus: () => true,
});

axios.interceptors.request.use(
	(config) => {
		console.log('Request made with ', config);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log('Response received', response);
		return response;
	},
	(error) => {
		if (error.response.status === 401) {
			console.log('Unauthorized, logging out...');
		}
		return Promise.reject(error);
	}
);

describe('First API tests', () => {
	test('GET /users status code is 200', async () => {
		const response = await axiosInstanse.get('users');
		expect(response.status).toBe(200);
	});

	test('GET /users data is defined', async () => {
		const response = await axiosInstanse.get('users');
		expect(response.status).toBe(200);
		expect(response.data).toBeDefined();
	});

	test('GET users response have 10 ids', async () => {
		const response = await axiosInstanse.get('users');
		expect(response.data).toHaveLength(10);
		expect(response.data.length).toBeLessThanOrEqual(10);
		expect(response.status).toBe(200);
	});

	test('POST /users status code is 201', async () => {
		const response = await axiosInstanse.post('posts', {
			id: 14,
			title: 'first try',
			body: 'first post is added',
			userId: 14,
		});
		expect(response.status).toBe(201);
	});

	test('POST /users have property UserID', async () => {
		const response = await axiosInstanse.post('posts', {
			id: 15,
			title: 'second try',
			body: 'second post is added',
			userId: 14,
		});
		expect(response.status).toBe(201);
		expect(response.data).toHaveProperty(`userId`, 14);
	});

	test('User can create a new car', async () => {
		let postResponse = await axiosInstanse.get('posts');
		const postList = [...postResponse.data];
		console.log(postList.length);
		const newPostResponse = await await axiosInstanse.post('posts', {
			id: 16,
			title: 'third try',
			body: 'third post is added',
			userId: 14,
		});
		postResponse = await axiosInstanse.get('posts');
		const newPostList = postResponse.data;
		console.log(newPostList.length);
		expect(newPostList.length).toBe(postList.length);
		// it should be: expect(newPostList.length).toBe(postList.length + 1), but "resource is not really updated on the server but it will be faked as if"
	});
});
