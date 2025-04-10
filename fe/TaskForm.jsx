import React, { useState } from "react";
import axios from "axios";

function TaskForm({ onAdd }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAdd(res.data); // refresh the task list
      setTask({ title: "", description: "", dueDate: "", priority: "Low" });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create task";
      alert(msg);
      console.error("Task create error:", msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Enter task title"
        required
      />
      <input
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Enter task description"
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
