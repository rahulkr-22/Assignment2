const {
  saveTask,
  getTasks,
  deleteTask,
} = require("../repositories/taskRepository");

const createTask = async (taskData) => {
  if (!taskData.title) {
    throw new Error("Title is required");
  }
  return await saveTask(taskData);
};

const listTasks = async () => {
  return await getTasks();
};

const removeTask = async (taskId) => {
  return await deleteTask(taskId);
};

module.exports = { createTask, listTasks, removeTask };
