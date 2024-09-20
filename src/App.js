import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Form from "./pages/Form.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
    .then(res => {
        return res.json();
    })
    .then(data => {
        setTasks(data);
    })
  }, [])

  const handleEdit = (task) => {
      setTaskToEdit(task);
  };

  const handleDelete = (id) => {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (!res.ok) throw new Error('Erreur suppression tâche');
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
      <Router>
        <div className="main">
            <h1>React To-Do List</h1>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard
                            tasks={ tasks }
                            filtered={ filter }
                            onFiltered={(newFilter) => setFilter(newFilter)}
                            onEdit={ handleEdit }
                            onDelete={ handleDelete }
                         />
                    }
                 />
                <Route
                    path="/newtask"
                    element={
                    <Form
                      onTaskAdded=
                       {(newTask) =>
                         setTasks(prevTasks =>
                           [...prevTasks, newTask])}
                     />}
                 />
                 <Route
                   path="/edittask/:id"
                   element={
                     <Form
                       taskToEdit={ taskToEdit }
                       onTaskUpdated=
                         {(updatedTask) =>
                           setTasks(prevTasks =>
                             prevTasks.map(
                               task => task.id === updatedTask.id ? updatedTask : task)
                         )}
                     />}
                />
            </Routes>
        </div>
      </Router>
  );
}

export default App;