const express = require("express");
const {
  createTask,
  listTasks,
  removeTask,
} = require("../services/taskServices");
const router = express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await listTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    await removeTask(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
