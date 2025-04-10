import React, { useState } from "react";
import axios from "axios";

function AuthForm({ onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const toggleMode = () => setIsRegister(!isRegister);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/api/auth/${
      isRegister ? "register" : "login"
    }`;
    const payload = isRegister
      ? form
      : { email: form.email, password: form.password };

    try {
      const res = await axios.post(url, payload);
      localStorage.setItem("token", res.data.token);
      onAuth();
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong.";
      alert(message); // ✅ show backend error in popup
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegister ? "Register" : "Login"} </h2>
      {isRegister && (
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
          required
        />
      )}
      <input
        type="text"
        name="email"
        placeholder="Enter email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
        required
      />
      <button type="submit">{isRegister ? "Register" : "Login"}</button>
      <p onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>
    </form>
  );
}

export default AuthForm;
