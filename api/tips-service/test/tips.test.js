const supertest = require('supertest');
const http = require('http');
const app = require('../src/app');
const mongoose = require('mongoose');
const Tip = require('../src/models/Tip');

let request;
let server;

describe("Tips Service", () => {
    beforeAll((done) => {
        server = http.createServer(app);
        server.listen(() => {
            const port = server.address().port;
            request = supertest(`http://localhost:${port}`);
            done();
        });
    });

    afterAll((done) => {
        server.close(() => {
            mongoose.disconnect().then(() => done());
        });
    });

    beforeEach(async () => {
        await Tip.deleteMany({});
    });

    test("POST /api/tips - It should create a new tip", async () => {
        const newTip = {
            nurseId: new mongoose.Types.ObjectId().toString(),
            patientId: new mongoose.Types.ObjectId().toString(),
            message: "Keep up the good work!"
        };
        const response = await request.post('/api/tips').send(newTip);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Keep up the good work!");
    });

    test("GET /api/tips/:patientId - It should retrieve all tips for a specific patient", async () => {
        const patientId = new mongoose.Types.ObjectId().toString();
        const tips = [
            { nurseId: new mongoose.Types.ObjectId().toString(), patientId: patientId, message: "Keep up the good work!" },
            { nurseId: new mongoose.Types.ObjectId().toString(), patientId: patientId, message: "You're doing great!" }
        ];
        await Tip.insertMany(tips);

        const response = await request.get(`/api/tips/${patientId}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
        expect(response.body[0].message).toEqual("Keep up the good work!");
        expect(response.body[1].message).toEqual("You're doing great!");
    });
});
