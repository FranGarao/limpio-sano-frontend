import { Helmet } from "react-helmet";
import "./About.scss";
import Slider from "../../../../components/Slider";
import wsp from "../../../../assets/icons/whatsapp.svg";
import mail from "../../../../assets/icons/email.svg";
export default function About() {

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
          espacios en perfectas condiciones. <br /><br /> Adaptamos nuestros servicios a las
          necesidades de cada cliente, con turnos flexibles desde 2 horas en
          adelante. <br />
          <br />
          Somos una opción confiable y experimentada en el mercado de limpieza
          en Bogotá e Ibagué.
        </p>
      </div>
      <div className="about-contact">
        <p>Contactanos!</p>
        <div>
          <img title="enviar un mail" className="icon" src={mail} alt="" />
          <img title="enviar un whatsapp" className="icon" src={wsp} alt="" />
        </div>
      </div>
    </>
  );
}
