const supertest = require('supertest');
const http = require('http');
const app = require('../src/app');  // Ensure this path matches the location of your app.js file
const mongoose = require('mongoose');
const VitalSign = require('../src/models/VitalSign');  // Adjust path as necessary

const request = supertest(app);

describe("Vital Signs Service", () => {
    let server;

    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(done);  // Start the server before tests run
    });

    afterAll((done) => {
        mongoose.disconnect().then(() => server.close(done));  // Disconnect MongoDB and close server after tests
    });

    beforeEach(async () => {
        await VitalSign.deleteMany({});  // Clean the database before each test
    });

    test("POST /api/vitalsigns - It should add new vital signs", async () => {
        const newVitalSigns = {
            patientId: new mongoose.Types.ObjectId(),
            bodyTemperature: 98.6,
            bloodPressure: "120/80",
            respiratoryRate: 16
        };

        const response = await request.post('/api/vitalsigns').send(newVitalSigns);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.bodyTemperature).toEqual(newVitalSigns.bodyTemperature);
    });

    test("GET /api/vitalsigns - It should retrieve all vital signs", async () => {
        const vitalSigns = [
            { patientId: new mongoose.Types.ObjectId(), bodyTemperature: 98.6, bloodPressure: "120/80", respiratoryRate: 16 },
            { patientId: new mongoose.Types.ObjectId(), bodyTemperature: 99.1, bloodPressure: "130/85", respiratoryRate: 18 }
        ];

        await VitalSign.insertMany(vitalSigns);

        const response = await request.get('/api/vitalsigns');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
    });
});

