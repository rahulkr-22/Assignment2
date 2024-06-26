const mongoose = require("mongoose");
const Task = require("../src/models/task");
const {
  saveTask,
  getTasks,
  deleteTask,
} = require("../src/repositories/taskRepository");

describe("Task Repository", () => {
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

  test("should save a task", async () => {
    const taskData = { title: "Test Task" };
    const savedTask = await saveTask(taskData);
    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe("Test Task");
  });

  test("should retrieve tasks", async () => {
    const taskData = { title: "Test Task" };
    await saveTask(taskData);
    const tasks = await getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Test Task");
  });

  test("should delete a task", async () => {
    const taskData = { title: "Test Task" };
    const savedTask = await saveTask(taskData);
    await deleteTask(savedTask._id);
    const tasks = await getTasks();
    expect(tasks).toHaveLength(0);
  });
});
