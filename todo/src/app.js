const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const taskController = require("./controllers/taskController");

const app = express();

app.use(bodyParser.json());
app.use("/api", taskController);

mongoose
  .connect("mongodb://localhost/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = app;
