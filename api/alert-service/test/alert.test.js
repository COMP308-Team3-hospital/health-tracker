const supertest = require('supertest');
const http = require('http');
const app = require('../src/app');  // Adjust the path as necessary to import your app
const mongoose = require('mongoose');
const Alert = require('../src/models/Alert');  // Ensure the path to your model is correct

let server;
let request;

describe("Alert Service", () => {
    beforeAll((done) => {
        // Create the server using the existing app
        server = http.createServer(app);
        server.listen(0, () => {  // Listen on a random free port
            const port = server.address().port;
            request = supertest(`http://localhost:${port}`);
            done();
        });
    });

    afterAll((done) => {
        // Close the server and then disconnect mongoose
        server.close(() => {
            mongoose.disconnect().then(() => done());
        });
    });

    beforeEach(async () => {
        // Ensure the database is clean before each test
        await Alert.deleteMany({});
    });

    test("POST /api/alerts - It should create a new alert", async () => {
        const newAlert = {
            patientId: new mongoose.Types.ObjectId().toString(),
            message: "Emergency at Room 101"
        };
        const response = await request.post('/api/alerts').send(newAlert);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Emergency at Room 101");
    });

    test("GET /api/alerts - It should retrieve all alerts", async () => {
        const alerts = [
            { patientId: new mongoose.Types.ObjectId().toString(), message: "Emergency at Room 102" },
            { patientId: new mongoose.Types.ObjectId().toString(), message: "Need immediate assistance in ICU" }
        ];
        await Alert.insertMany(alerts);
        const response = await request.get('/api/alerts');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
        expect(response.body[0].message).toEqual(alerts[0].message);
        expect(response.body[1].message).toEqual(alerts[1].message);
    });
});
