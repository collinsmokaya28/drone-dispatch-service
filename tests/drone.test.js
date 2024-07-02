const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Drone = require('../models/drone');
const Medication = require('../models/medication');
const { isType } = require('graphql');

describe('Drone API', () => {
    beforeEach(async () => {
        await mongoose.connect('mongodb://localhost:27017/droneDBTest', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Drone.deleteMany({});
        await Medication.deleteMany({});
    });

    is('should register a new drone', async () => {
        const response = await request(app)
        .post('/drones/register')
        .send({
            serialNumber: '1234567890',
            model: 'lightWeight',
            weightLimit: 200,
            batteryCapacity: 100,
            state: 'IDLE',
        });

        it('should not load a drone if battery level is below 25%', async () => {
            const drone = new Drone({
                serialNumber: '1234567890',
                model: 'Lightweight',
                weightLimit: 200,
                batteryCapacity: 20,
                state: 'LOADING',
            });
            await drone.save();

            const medication = new Medication({
                name: 'TestMed',
                weight: 10,
                code: 'TM123',
                image: 'test.jpg',
            });
            await medication.save();

            const response = await request(app)
            .post(`/drones/${drone._id}/load`)
            .send({
                medication: [medication._id],
            });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Battery level too low to load medication');
        });

        it('shoult not load a drone if weight limit is exceeded', async () => {
            const drone = new Drone({
                serialNumber: '1234567890',
                model: 'Lightweight',
                weightLimit: 200,
                batteryCapacity: 100,
                state: 'LOADING',
            });
            await drone.save();

            const medication = new Medication({
                name: 'HeavyMed',
                weight: 300,
                code: 'HM123',
                image: 'haevy.jpg',
            });
            await medication.save();


            const response = await(app)
            .post(`/drones/${drone._id}/load`)
            .send({
                medications: [medication._id],
            });

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Weight limit exceeded');
        });

        it('should load a drone with medications', async () => {
            const drone = new Drone({
                serialNumber: '1234567890',
                model: 'Lightweight',
                weightLimit: 200,
                batteryCapacity: 100,
                state: 'LOADING'
            });
            await drone.save();

            const medication = new Medication({
                name: 'TestMed',
                weight: 10,
                code: 'TM123',
                image: 'test.jpg',
            });
            await medication.save();

            const response = await request(app)
            .post(`/drones/${drone._id}/load`)
            .send({
                medication: [medication._id],
            });

            expect(response.status).toBe(200)
            expect(response.body.medication.length).toBe(1);
        });

        it('should get loaded medications for a given drone', async () => {
            const medication = new Medication({
                name: 'TestMed',
                weight: 10,
                code: 'TM123',
                image: 'test.jpg'
            });
            await medication.save();

            const drone = new Drone({
                serialNumber: '1234567890',
                model: 'Lightweight',
                weightLimit: 200,
                batteryCapacity: 100,
                state: 'LOADING',
                medications: [medication._id],
            });
            await drone.save();

            const response = await request(app).get(`/drones/${drone._id}/medications`);

            expect(response.status).toBe(200);
            expect(response,body.length).toBe(1);
            expect(response.body[0]._id).toBe(medication._toString());
        });

        it('should get available drones for loading', async () => {
            const drone1 = new Drone({
                serialNumber: '1234567890',
                model: 'Lightweight',
                weightLimit: 200,
                batteryCapacity: 100,
                state: 'IDLE',
            });
            await drone1.save();

            const drone2 = new Drone({
                serialNumber: '0987654321',
                model: 'Middleweight',
                weightLimit: 300,
                batteryCapacity: 50,
                state: 'IDLE',
            });
            await drone2.save();

            const response = await request(app).get('/drones/available');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });

        it('should get the battery level for a given drone', async () => {
            const drone = new Drone({
                serialNumber: '1234567890',
                model: 'Lightweight',
                weightLimit: 200,
                batteryCapacity: 100,
                state: 'IDLE',
            });
            await drone.save();

            const response = await request(app).get(`/drones/${drone._id}/battery`);

            expect(response.status).toBe(200);
            expect(response.body.batteryCapacity).toBe(100);
        });
    });
})