import "./navbar.css";
import LinkButton from "../shared/LinkButton.jsx";
import Button from "../shared/Button.jsx";

export default function NavBar({ filter, setFilter }) {
    
  return (
    <div className="buttons-list">
      <LinkButton
        path="/newtask"
        className="main-button"
        content="Ajouter une nouvelle to-do"
      />
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