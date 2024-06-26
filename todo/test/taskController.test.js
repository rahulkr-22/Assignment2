const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Task = require("../src/models/task");

describe("Task Controller", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/todo-app-test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  test("POST /api/tasks - should create a task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task" })
      .expect(201);

    expect(response.body.title).toBe("Test Task");
    const tasks = await Task.find();
    expect(tasks).toHaveLength(1);
  });

  test("GET /api/tasks - should retrieve tasks", async () => {
    await Task.create({ title: "Test Task" });
    const response = await request(app).get("/api/tasks").expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Test Task");
  });

  test("DELETE /api/tasks/:id - should delete a task", async () => {
    const task = await Task.create({ title: "Test Task" });
    await request(app).delete(`/api/tasks/${task._id}`).expect(204);

    const tasks = await Task.find();
    expect(tasks).toHaveLength(0);
  });
});
