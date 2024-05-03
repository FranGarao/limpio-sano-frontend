import { Helmet } from "react-helmet";
import "./About.scss";
import Slider from "../../../../components/Slider";
import wsp from "../../../../assets/icons/whatsapp.svg";
import mail from "../../../../assets/icons/emailAbout.svg";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  const redirect = (path) => {
    navigate(path);
  };
  return (
    <>
      <Helmet>
        <title>Nosotros | Limpio&Sano</title>
      </Helmet>
      <Slider />
      <div className="about-ctn">
        <h2>¿Quiénes somos?</h2>
        <p>
          <b>Limpi&Sano SAS</b> es una empresa colombiana especializada en
          servicios de aseo, limpieza y desinfección. <br />
          <br />
          Ofrecemos atención tanto para hogares como para empresas y oficinas.
          Nuestro equipo de profesionales está capacitado para mantener los
          espacios en perfectas condiciones. <br />
          <br /> Adaptamos nuestros servicios a las necesidades de cada cliente,
          con turnos flexibles desde 2 horas en adelante. <br />
          <br />
          Somos una opción confiable y experimentada en el mercado de limpieza
          en Bogotá e Ibagué.
        </p>
      </div>
      <div className="about-contact">
        <p>Contactanos!</p>
        <div>
          <img
            onClick={() => redirect("/contact")}
            title="enviar un mail"
            className="icon"
            src={mail}
            alt=""
          />
          <a
            href={`https://wa.me/573225292067?text=¡Hola!%20Queria%20mas%20informacion%20sobre%20los servicios%20que%20ofrecen`}
            target="_blank"
          >
            <img
              title="enviar un whatsapp"
              target="_blank"
              className="icon"
              src={wsp}
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
}
