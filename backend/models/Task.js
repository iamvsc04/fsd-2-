const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ["High", "Normal", "Low"], default: "Low" },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
