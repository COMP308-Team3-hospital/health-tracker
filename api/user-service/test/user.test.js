const supertest = require('supertest');
const app = require('../src/app');  // Assuming you export Express app
const mongoose = require('mongoose');
const User = require('../src/models/user.model');

const request = supertest(app);

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  // afterEach(async () => {
  //   await User.deleteMany({});
  // });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("It should register a user", async () => {
    const response = await request.post('/api/users/register').send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      role: "nurse"
    });
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("User registered successfully");
  });

  test("It should log in a user", async () => {
    const response = await request.post('/api/users/login').send({
      email: "john@example.com",
      password: "password123"
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
