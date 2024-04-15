import question from "../../assets/icons/question.svg";
import { Link } from "react-router-dom"
import "./NotFound.scss";
export default function NotFound() {
  return (
    <div className="not-found-container">
    <div className="not-found">
      <img src={question} alt="question icon" />
      <h1>404 - Not Found</h1>
        <h2>Parece que no se ha encontrado nada en esta ubicación.</h2>
        <h3 className="back-to-home"><Link to='/home' className="link">Volver a la página principal</Link></h3>
    </div>
    </div>
  );
}
