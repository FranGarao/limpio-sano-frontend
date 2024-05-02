import { useNavigate } from "react-router-dom";
import "./Alert.scss";

export default function Alert() {
  const navigate = useNavigate();
  const handleOc = () => {
    navigate(
      "https://wa.me/573225292067?text=¡Hola!%20Queria%20mas%20informacion%20sobre%20los servicios%20que%20ofrecen"
    );
  };
  const handleFij = () => {
    navigate("/contact");
  };

  return (
    <div className="background">
      <div className="alert">
        <p className="alert-text">Elija la regularidad del servicio</p>
        <div>
          <button onClick={handleOc} className="oc-btn">
            Ocasional
          </button>
          <button onClick={handleFij} className="fij-btn">
            Fijo
          </button>
        </div>
      </div>
    </div>
  );
}
