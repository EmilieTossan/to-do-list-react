import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import TasksList from "./TasksList.jsx";

export default function DashBoard({ tasks, filtered, onFiltered, onEdit, onDelete }) {

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
            <NavBar
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