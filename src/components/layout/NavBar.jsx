import { Link } from "react-router-dom";
import FilterButton from "../shared/FilterButton.jsx";

export default function NavBar({ filtered, setFilter}) {
    
  return (
    <div className="buttons-list">
      <Link to="/newtask" className="button main-button">
          Ajouter une nouvelle to-do
      </Link>
      <div>
        <FilterButton
          content="Tout"
          className={`button select-button${filtered === "All" ? " active" : ""}`}
          setFilter={ setFilter }
          filterName="All"
          />
        <FilterButton
          content="À faire"
          className={`button select-button${filtered === "Pending" ? " active" : ""}`}
          setFilter={ setFilter }
          filterName="Pending"
          />
        <FilterButton
          content="Terminées"
          className={`button select-button${filtered === "Completed" ? " active" : ""}`}
          setFilter={ setFilter }
          filterName="Completed"
          />
      </div>
    </div>
  );
}