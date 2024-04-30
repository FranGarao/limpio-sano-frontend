import { useState, useEffect } from "react";
import "./Slider.scss";
import useApiRequest from "../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";
function Slider() {
  const [index, setIndex] = useState(0);
  const { get } = useApiRequest();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    get("/slider")
      .then((data) => setImages(data.images))
      .catch((error) => console.log({ error }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(timer);
  }, [images]);

  const toService = () => {
    navigate("/services");
  };
  return (
    <div className="slider">
      {images.map((image, i) => (
        <img
          className="slider-image"
          key={i}
          src={image?.url}
          alt=""
          style={{ display: i === index ? "block" : "none" }}
        />
      ))}
      <div className="title-slider">
        <h2>
          Servicios de aseo, limpieza y desinfección para hogares, empresas,
          oficinas y propiedad horizontal
        </h2>
        <p>
          ¡Agenda y cotiza tu servicio de limpieza y aseo por horas o como mejor
          te convenga!
        </p>
        <button onClick={toService}>Ver Servicios</button>
      </div>
    </div>
  );
}

export default Slider;
