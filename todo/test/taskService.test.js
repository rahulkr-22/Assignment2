const {
  createTask,
  listTasks,
  removeTask,
} = require("../src/services/taskServices");
const {
  saveTask,
  getTasks,
  deleteTask,
} = require("../src/repositories/taskRepository");

jest.mock("../src/repositories/taskRepository");

describe("Task Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a task", async () => {
    const taskData = { title: "Test Task" };
    saveTask.mockResolvedValue(taskData);
    const result = await createTask(taskData);
    expect(result.title).toBe("Test Task");
    expect(saveTask).toHaveBeenCalledWith(taskData);
  });

  test("should throw an error if title is missing", async () => {
    const taskData = { description: "No title" };
    await expect(createTask(taskData)).rejects.toThrow("Title is required");
  });

  test("should list tasks", async () => {
    const taskData = [{ title: "Test Task" }];
    getTasks.mockResolvedValue(taskData);
    const result = await listTasks();
    expect(result).toEqual(taskData);
    expect(getTasks).toHaveBeenCalled();
  });

  test("should remove a task", async () => {
    deleteTask.mockResolvedValue();
    await removeTask("123");
    expect(deleteTask).toHaveBeenCalledWith("123");
  });
});
