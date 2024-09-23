import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Form({ onTaskAdded, taskToEdit, onTaskUpdated }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [priority, setPriority] = useState("");
    const [fulfillment, setFulfillment] = useState(0);
    
    const [errName, setErrName] = useState("");
    const [errCategory, setErrCategory] = useState("");
    const [errPriority, setErrPriority] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(taskToEdit) {
            setName(taskToEdit.name);
            setDescription(taskToEdit.description);
            setCategory(taskToEdit.category);
            setDate(taskToEdit.date);
            setTime(taskToEdit.time);
            setPriority(taskToEdit.priority);
            setFulfillment(taskToEdit.fulfillment);
        }
    }, [taskToEdit])

    const validateForm = (e) => {

        e.preventDefault();

        setErrName(() =>
            name === "" ? "Choisissez un nom pour la to-do" : ""
        );
        setErrCategory(() =>
            category === "" ? "Choisissez une catégorie pour la to-do" : ""
        );
        setErrPriority(() =>
            priority === "" ? "Choisissez une priorité pour la to-do" : ""
        );

        const taskData = {
            name,
            description,
            category,
            date: date,
            time,
            priority,
            fulfillment: Number(fulfillment)
        };

        if (name !== "" && category !== "" && priority !== "") {

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
                        <input
                            type="text"
                            placeholder="nommez la tâche que vous allez faire"
                            value={name}
                            onChange={(e) => setName(() => e.target.value)}
                         />
                         {errName !== "" ? <p className="error-message">{errName}</p> : ""}
                    </td>
                    <td>Priorité :</td>
                    <td>
                        <select
                            value={ priority }
                            onChange={(e) => setPriority(() => e.target.value)}
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
                        {errPriority !== "" ? <p className="error-message">{errPriority}</p> : ""}
                    </td>
                </tr>
                <tr>
                    <td>Description :</td>
                    <td>
                        <textarea
                            rows="3"
                            placeholder="décrivez brièvement la tâche (facultative)"
                            value={ description }
                            onChange={(e) => setDescription(() => e.target.value)}
                         />
                    </td>
                    <td>Avancement :</td>
                    <td>
                        <input
                            type="range"
                            id="rangeInput"
                            min="0"
                            max="100"
                            value={ fulfillment }
                            onChange={(e) => setFulfillment(() => e.target.value)}
                         />
                    </td>
                </tr>
                <tr>
                    <td>Catégorie :</td>
                    <td>
                        <input
                            type="text"
                            placeholder="exemples : domestique, école, travail"
                            value={ category }
                            onChange={(e) => setCategory(() => e.target.value)}
                         />
                        {errCategory !== "" ? <p className="error-message">{errCategory}</p> : ""}
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
                        <input
                            type="date"
                            placeholder="dd/mm/aaaa (facultative)"
                            value={ date }
                            onChange={(e) => setDate(() => e.target.value)}
                         />
                    </td>
                </tr>
                <tr>
                    <td>Heure :</td>
                    <td>
                        <input
                            type="time"
                            placeholder="hh:mm (facultative)"
                            value={ time }
                            onChange={(e) => setTime(() => e.target.value)}
                         />
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    );
}