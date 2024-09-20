import { Link } from "react-router-dom";
import FilterButton from "./FilterButton.jsx";

export default function NavBar({ filtered, onFiltered }) {
    return (
      <div className="buttons-list">
        <Link to="/newtask" className="button main-button">
            Ajouter une nouvelle to-do
        </Link>
        <div>
          <FilterButton
            content="Tout"
            className={`button select-button${filtered === "All" ? " active" : ""}`}
            newFilter="All"
            onFiltered={ onFiltered }
           />
          <FilterButton
            content="À faire"
            className={`button select-button${filtered === "Pending" ? " active" : ""}`}
            newFilter="Pending"
            onFiltered={ onFiltered }
           />
          <FilterButton
            content="Terminées"
            className={`button select-button${filtered === "Completed" ? " active" : ""}`}
            newFilter="Completed"
            onFiltered={ onFiltered }
           />
        </div>
      </div>
    );
}