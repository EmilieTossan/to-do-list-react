import NavBar from "../components/layout/NavBar.jsx";
import TasksList from "./dashboard/TasksList.jsx";

export default function Dashboard({ filter, setFilter, tasks, setTasks, setTaskToEdit }) {

    return (
        <>
            <NavBar
                filter={ filter }
                setFilter={ setFilter }
             />
            <TasksList
                tasks={ tasks }
                filter={ filter }
                setTasks={ setTasks }
                setTaskToEdit={ setTaskToEdit }
             />
        </>
    );
}