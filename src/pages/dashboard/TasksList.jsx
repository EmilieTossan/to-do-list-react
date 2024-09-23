import React from 'react';
import { useNavigate } from "react-router-dom";

export default function TasksList({ tasks, setTasks, setTaskToEdit, filtered }) {

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

    const filteredTasks = tasks.filter(task => {
        if (filtered === "All") return true;
        if (filtered === "Pending") return task.fulfillment < 100;
        if (filtered === "Completed") return task.fulfillment === 100;
        return false;
    });

    return (
        <table>
            <thead>
              <tr>
                <th>Tâche</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Priorité</th>
                <th>Avancement</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                { filteredTasks.map((task) => (
                    <tr className="tasks" id={ task.id }>
                        <td>{ task.name ? task.name : "-" }</td>
                        <td>{ task.description ? task.description : "-" }</td>
                        <td>{ task.category ? task.category : "-" }</td>
                        <td>
                            { task.date ? 
                                <>
                                    { new Date(task.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) }
                                    <br />
                                    { task.time }
                                </>
                                : "-" 
                            }
                        </td>
                        <td>{ task.priority ? task.priority : "-" }</td>
                        <td>{ task.fulfillment }%</td>
                        <td className="ud-icons">
                            <div className="ud-icons-container">
                                <img
                                    src="/icon/edit.svg"
                                    alt={`Modifier la tâche ${ task.name }`}
                                    width={17}
                                    onClick={() => onEdit(task)}
                                 />
                                <img
                                    src="/icon/delete.svg"
                                    alt={`Supprimer la tâche ${ task.name }`}
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