import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <div>
      <h1>Todo App</h1>
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <TaskForm onAdd={() => window.location.reload()} />
          <TaskList />
        </>
      ) : (
        <>
          <AuthForm onAuth={() => setIsLoggedIn(true)} />
        </>
      )}
    </div>
  );
}

export default App;
