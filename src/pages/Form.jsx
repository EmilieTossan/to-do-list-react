import Input from "../components/shared/Input";
import Button from "../components/shared/Button"
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

    const navigate = useNavigate();

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

        if (task.name !== "" && task.category !== "" && task.priority !== "") {

            const BASE_URL = "http://localhost:3000/tasks";

            const fetchTask = async (method, url, isUpdate) => {

                return fetch (url, {
                    method: method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
                })
                .then(res => {
                    if (!res.ok) throw new Error(method === "PUT" ? "Erreur modification tâche" : "Erreur ajout tâche");
                    return res.json();
                })
                .then((task) => {
                    isUpdate ? onTaskUpdated(task) : onTaskAdded(task);
                    navigate('/');
                })
                .catch(err => console.error(err));
            }

            if (taskToEdit) {

                fetchTask(
                    "PUT",
                    `BASE_URL/${taskToEdit.id}`,
                    true
                );

            } else {

                fetchTask(
                    "POST",
                    BASE_URL,
                    false
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
                                <Button
                                    content="Enregistrer"
                                    className="save-button"
                                />
                                <Link
                                    to="/"
                                    className="cancel-button"
                                >
                                    Annuler
                                </Link>
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