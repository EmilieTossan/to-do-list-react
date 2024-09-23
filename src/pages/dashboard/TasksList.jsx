import React from 'react';

export default function TasksList({ tasks, onEdit, onDelete }) {

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
                { tasks.map((task) => (
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