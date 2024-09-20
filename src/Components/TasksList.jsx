import React from 'react';
import { useNavigate } from "react-router-dom";

export default function TasksList({ tasks, onEdit, onDelete }) {

    const navigate = useNavigate();

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
                        <td>{ task.name }</td>
                        <td>{ task.description }</td>
                        <td>{ task.category }</td>
                        <td>{ task.date }<br />{ task.time }</td>
                        <td>{ task.priority }</td>
                        <td>{ task.fulfillment }%</td>
                        <td className="ud-icons">
                            <div className="ud-icons-container">
                                <img
                                    src="/icon/edit.svg"
                                    width={17}
                                    onClick={() => onEdit(task)}
                                 />
                                <img
                                    src="/icon/delete.svg"
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