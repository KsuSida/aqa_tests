const { CarsController } = require('../src/controllers/CarsController');

const carsController = new CarsController();

describe('Check Cars API', () => {
	beforeAll(async () => {
		await carsController.login();
	});

	afterAll(async () => {
		const carsResponse = await carsController.getCars();
		const carIds = carsResponse.data.data.map((c) => c.id);
		for (const carId of carIds) {
			const res = await carsController.deleteCarById(carId);
		}
	});

	test('User creates new cars', async () => {
		const carsModelResponse = await carsController.getCarModels();
		const carsCount = carsModelResponse.data.data.length;
		const carBrandsID = carsModelResponse.data.data.map((c) => c.carBrandId);
		const carModelsID = carsModelResponse.data.data.map((c) => c.id);
		for (let i = 0; i < carsCount; i++) {
			const newCarResponse = await carsController.createCar(`${carBrandsID[i]}`, `${carModelsID[i]}`, 1020);
		}
	});

	test('User can get all cars', async () => {
		const carsResponse = await carsController.getCars();
		expect(carsResponse.status).toBe(200);
		console.log(carsResponse.data.data.length);
	});

	test('User creates a car with incorrect data', async () => {
		const carResponse = await carsController.createCar(8, 1, 1020);
		expect(carResponse.status).toBe(404);
	});

	test('User tries to find incorrect brand', async () => {
		const carBrandsResponse = await carsController.getCarBrands();
		const carBrands = carBrandsResponse.data.data.map((c) => c.title);
		const expectedBrand = { brand: `Suzuki` };
		expect(carBrands).toEqual(expect.not.objectContaining(expectedBrand));
	});

	test('User tries to find incorrect model', async () => {
		const expectedModel = `Tipo Cross`;
		const carModelsResponse = await carsController.getCarModels();
		const carModels = carModelsResponse.data.data.map((c) => c.title);
		expect(carModels).not.toContain(expectedModel);
	});
});
