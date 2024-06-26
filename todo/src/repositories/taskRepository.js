const Task = require("../models/task");

const saveTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const getTasks = async () => {
  return await Task.find();
};

const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};

module.exports = { saveTask, getTasks, deleteTask };
