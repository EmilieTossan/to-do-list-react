import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Form from "./pages/Form.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("All");

  console.log(filter);
  
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
    .then(res => {
        return res.json();
    })
    .then(data => {
        setTasks(data);
    })
  }, [])

  return (
    <Router>
      <div className="main">
          <h1>React To-Do List</h1>
          <Routes>
            <Route
                path="/"
                element={
                  <Dashboard
                    filter={ filter }
                    setFilter={ setFilter }
                    tasks={ tasks }
                    setTasks={ setTasks }
                    setTaskToEdit={ setTaskToEdit }
                    />
                }
              />
            <Route
              path="/newtask"
              element={
              <Form
                setTasks={ setTasks }
                />}
              />
            <Route
              path="/edittask/:id"
              element={
                <Form
                  taskToEdit={ taskToEdit }
                  setTasks={ setTasks }
                  />
              }
              />
          </Routes>
      </div>
    </Router>
  );
}

export default App;