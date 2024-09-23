import NavBar from "../components/layout/NavBar.jsx";
import TasksList from "./dashboard/TasksList.jsx";

export default function Dashboard({ filtered, setFilter, tasks, setTasks, setTaskToEdit }) {

    return (
        <>
            <NavBar
                filtered={ filtered }
                setFilter={ setFilter }
             />
            <TasksList
                tasks={ tasks }
                setTasks={ setTasks }
                setTaskToEdit={ setTaskToEdit }
                filtered={ filtered }
             />
        </>
    );
}