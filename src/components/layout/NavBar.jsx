import { Link } from "react-router-dom";
import Button from "../shared/Button.jsx";

export default function NavBar({ filter, setFilter }) {
    
  return (
    <div className="buttons-list">
      <Link to="/newtask" className="main-button">
          Ajouter une nouvelle to-do
      </Link>
      <div>
        <Button
          content="Tout"
          className={`select-button${filter === "All" ? " active" : ""}`}
          setFilter={ setFilter }
          filter="All"
          />
        <Button
          content="À faire"
          className={`select-button${filter === "Pending" ? " active" : ""}`}
          setFilter={ setFilter }
          filter="Pending"
          />
        <Button
          content="Terminées"
          className={`select-button${filter === "Completed" ? " active" : ""}`}
          setFilter={ setFilter }
          filter="Completed"
          />
      </div>
    </div>
  );
}