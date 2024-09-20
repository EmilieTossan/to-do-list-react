import "./App.css";
import Form from "./Components/Form.jsx";
import TasksList from "./Components/TasksList.jsx";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function FilterButton({ content, className, newFilter, onFiltered }) {
  return (
    <button
        className={ className }
        onClick={() => onFiltered(newFilter)}
    >
        {content}
    </button>
  )
}

function Navbar({ filtered, onFiltered }) {
    return (
      <div className="buttons-list">
        <Link to="/newtask" className="button main-button">
            Ajouter une nouvelle to-do
        </Link>
        <div>
          <FilterButton
            content="Tout"
            className={`button select-button${filtered === "All" ? " active" : ""}`}
            newFilter="All"
            onFiltered={ onFiltered }
           />
          <FilterButton
            content="À faire"
            className={`button select-button${filtered === "Pending" ? " active" : ""}`}
            newFilter="Pending"
            onFiltered={ onFiltered }
           />
          <FilterButton
            content="Terminées"
            className={`button select-button${filtered === "Completed" ? " active" : ""}`}
            newFilter="Completed"
            onFiltered={ onFiltered }
           />
        </div>
      </div>
    );
}

function DashBoard({ tasks, filtered, onFiltered, onEdit, onDelete }) {

    const navigate = useNavigate();

    const handleEdit = (task) => {
      onEdit(task);
      navigate(`/edittask/${task.id}`);
    };

    const filteredTasks = tasks.filter(task => {
        if (filtered === "All") return true;
        if (filtered === "Pending") return task.fulfillment < 100;
        if (filtered === "Completed") return task.fulfillment === 100;
        return false;
    });

    return (
        <>
            <Navbar
                filtered={ filtered }
                onFiltered={ onFiltered }
             />
            <TasksList
                tasks={ filteredTasks }
                onEdit={ handleEdit }
                onDelete={ onDelete }
             />
        </>
    );
}

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
                        <DashBoard
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
                    <Form />}
                />
                 <Route
                   path="/edittask/:id"
                   element={
                     <Form
                       onTaskAdded=
                         {(newTask) =>
                           setTasks(prevTasks =>
                             [...prevTasks, newTask])}
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
