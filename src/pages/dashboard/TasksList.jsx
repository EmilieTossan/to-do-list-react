import "./taskslist.css";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function TasksList({ tasks, filter, setTasks, setTaskToEdit }) {

    const filteredTasks = tasks.filter(task => {
        if (filter === "All") return true;
        if (filter === "Pending") return task.fulfillment < 100;
        if (filter === "Completed") return task.fulfillment === 100;
        return false;
    });

    const navigate = useNavigate();

    const onEdit = (task) => {
        setTaskToEdit(task);
        navigate(`/edittask/${task.id}`);
    };

    const onDelete = (id) => {
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
        <table style={{width: "100%", tableLayout: "fixed"}}>
            <thead>
              <tr>
                <th style={{width: "15%"}}>Tâche</th>
                <th style={{width: "36%"}}>Description</th>
                <th style={{width: "12%"}}>Catégorie</th>
                <th style={{width: "10%"}}>Date</th>
                <th style={{width: "9%"}}>Priorité</th>
                <th style={{width: "9%"}}>Avancement</th>
                <th style={{width: "9%"}}></th>
              </tr>
            </thead>
            <tbody>
                { filteredTasks.map((task, index) => (
                    <tr className="tasks" key={ index }>
                        <td style={{width: "15%"}}>{ task.name ? task.name : "-" }</td>
                        <td style={{width: "36%"}}>{ task.description ? task.description : "-" }</td>
                        <td style={{width: "12%"}}>{ task.category ? task.category : "-" }</td>
                        <td style={{width: "10%"}}>
                            { task.date ?
                                <>
                                    { new Date(task.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
                                    <br />
                                    { task.time }
                                </>
                                : "-" 
                            }
                        </td>
                        <td style={{width: "9%"}}>{ task.priority ? task.priority : "-" }</td>
                        <td style={{width: "9%"}}>{ task.fulfillment }%</td>
                        <td style={{width: "9%"}} className="ud-icons">
                            <div className="ud-icons-container">
                                <img
                                    src="/icon/edit.svg"
                                    alt={`Modifier ${ task.name }`}
                                    width={17}
                                    onClick={() => onEdit(task)}
                                 />
                                <img
                                    src="/icon/delete.svg"
                                    alt={`Supprimer ${ task.name }`}
                                    width={17}
                                    onClick={() => onDelete(task.id)}
                                 />
                            </div>
                        </td>
                    </tr>
                )) }
            </tbody>
        </table>
    );
}