const Task = require("../models/Task");

// GET all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err.message);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// CREATE a new task for the logged-in user
exports.createTask = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    console.log("Creating task for user:", req.user._id);
    console.log("Task payload:", req.body);
    const task = await Task.create({ ...req.body, user: req.user._id });
    console.log(task);
    res.json(task);
  } catch (err) {
    console.error("Task creation error:", err.message);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// UPDATE a specific task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Update task error:", err.message);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE a specific task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task Deleted" });
  } catch (err) {
    console.error("Delete task error:", err.message);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
