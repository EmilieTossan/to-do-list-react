import "./buttons.css";
import { Link } from "react-router-dom";

export default function LinkButton({ path, className, content}) {
  
  return (
    <Link to={path} className={className}>
      {content}
    </Link>
  )
}