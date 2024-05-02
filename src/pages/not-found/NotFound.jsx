import question from "../../assets/icons/question.svg";
import { Link } from "react-router-dom"
import "./NotFound.scss";
export default function NotFound() {
  return (
    <div className="not-found-container">
    <div className="not-found">
      <img src={question} alt="question icon" />
      <h1><b>Error 404</b></h1>
        <h2>Parece que seguimos limpiando esta ubicación!</h2>
        <button className="back-to-home"><Link to='/home' className="link">Volver al inicio</Link></button>
    </div>
    </div>
  );
}
