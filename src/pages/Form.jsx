import Input from "../components/shared/Input";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Form({ setTasks, taskToEdit }) {

    const [task, setTask] = useState({
        name: "",
        description: "",
        category: "",
        date: "",
        time: "",
        priority: "",
        fulfillment: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "fulfillment" ? Number(value) : value;
        setTask(prevTask => ({
            ...prevTask,
            [name]: newValue
        }));
    };
    
    const [errors, setErrors] = useState({
        name: "",
        category: "",
        priority: ""
    });

    function onTaskAdded(newTask) {
        setTasks(prevTasks =>
            [...prevTasks, newTask])
    }

    function onTaskUpdated(updatedTask) {
        setTasks(prevTasks =>
            prevTasks.map(
              task => task.id === updatedTask.id ? updatedTask : task)
        )
    }

    const navigate = useNavigate();

    useEffect(() => {
        if(taskToEdit) {
            const {
                name,
                description,
                category,
                date,
                time,
                priority,
                fulfillment
            } = taskToEdit;
            setTask({
                name,
                description,
                category,
                date,
                time,
                priority,
                fulfillment
            })
        }
    }, [taskToEdit])

    const validateForm = (e) => {

        e.preventDefault();

        const errors = {
            name: "",
            category: "",
            priority: ""
        };

        if (task.name === "") {
            errors.name = "Choisissez un nom pour la to-do";
        }
        if (task.category === "") {
            errors.category = "Choisissez une catégorie pour la to-do";
        } 
        if (task.priority === "") {
            errors.priority = "Choisissez une priorité pour la to-do";
        }

        setErrors(errors);

        const taskData = task;

        if (task.name !== "" && task.category !== "" && task.priority !== "") {

            if (taskToEdit) {

                fetch(`http://localhost:3000/tasks/${taskToEdit.id}`, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(taskData)
                })
                .then(res => {
                    if (!res.ok) throw new Error("Erreur modification tâche");
                    return res.json();
                })
                .then(updatedTask => {
                    onTaskUpdated(updatedTask);
                    navigate('/');
                })
                .catch(
                    err => console.error(err)
                );

            } else {

                fetch('http://localhost:3000/tasks', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(taskData)
                })
                .then(res => {
                    if (!res.ok) throw new Error("Erreur ajout tâche");
                    return res.json();
                })
                .then(data => {
                    onTaskAdded(data);
                    navigate('/');
                })
                .catch(
                    err => console.error(err)
                );
            }
        }
    }

    return (
        <form onSubmit={ validateForm }>
            <table>
                <colgroup>
                    <col className="small-col" />
                    <col className="big-col" />
                    <col className="small-col" />
                    <col className="big-col" />
                </colgroup>
            <tbody>
                <tr>
                    <td colSpan="4">
                        <h2>Ajouter une nouvelle do-to :</h2>
                    </td>
                </tr>

                <tr>
                    <td>Nom :</td>
                    <td>
                        <Input
                            type="text"
                            placeholder="nommez la tâche que vous allez faire"
                            value={ task.name }
                            onChange={ handleInputChange }
                            error={errors.name }
                        />
                    </td>
                    <td>Priorité :</td>
                    <td>
                        <select
                            value={ task.priority }
                            onChange={ handleInputChange }
                        >
                            <option
                                value=""
                                disabled
                            >
                                sélectionnez à partir de la liste déroulante
                            </option>
                            <option value="Haute">Haute</option>
                            <option value="Moyenne">Moyenne</option>
                            <option value="Basse">Basse</option>
                        </select>
                        {errors.priority !== "" ? <p className="error-message">{errors.priority}</p> : ""}
                    </td>
                </tr>
                <tr>
                    <td>Description :</td>
                    <td>
                        <textarea
                            rows="3"
                            placeholder="décrivez brièvement la tâche (facultative)"
                            value={ task.description }
                            onChange={ handleInputChange }
                         />
                    </td>
                    <td>Avancement :</td>
                    <td>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={ task.fulfillment }
                            onChange={ handleInputChange }
                         />
                    </td>
                </tr>
                <tr>
                    <td>Catégorie :</td>
                    <td>
                        <Input 
                            type="text"
                            placeholder="exemples : domestique, école, travail"
                            value={ task.category }
                            onChange={ handleInputChange }
                            error={ errors.category }
                        />
                    </td>
                    <td rowSpan="3" colSpan="2" className="form-buttons">
                        <div className="form-buttons-container">
                            <button className="button save-button">Enregistrer</button>
                            <Link to="/" className="button cancel-button">Annuler</Link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Date :</td>
                    <td>
                        <Input
                            type="date"
                            value={ task.date }
                            onChange={ handleInputChange }
                        />
                    </td>
                </tr>
                <tr>
                    <td>Heure :</td>
                    <td>
                        <Input
                            type="time"
                            value={ task.time }
                            onChange={ handleInputChange }
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    );
}