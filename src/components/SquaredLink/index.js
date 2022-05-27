import { Link } from 'react-router-dom';
import './style.css';

export default function SquaredLink({ title, location }) {
  return (
    <Link to={location} className="buttonContainer">
      {title}
    </Link>
  );
}
