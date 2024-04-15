import { Helmet } from "react-helmet";
import "./About.scss";
export default function About() {
  return (
    <>
      <Helmet>
        <title>Nosotros | Limpio&Sano</title>
      </Helmet>

      <div>
        <h1>¿Quiénes somos?</h1>
        <p>
          <b>Limpi&Sano SAS</b> es una empresa colombiana especializada en
          servicios de aseo, limpieza y desinfección. <br />
          Ofrecemos atención tanto para hogares como para empresas y oficinas.
          Nuestro equipo de profesionales está capacitado para mantener los
          espacios en perfectas condiciones. Adaptamos nuestros servicios a las
          necesidades de cada cliente, con turnos flexibles desde 2 horas en
          adelante. Somos una opción confiable y experimentada en el mercado de
          limpieza en Bogotá e Ibagué.
        </p>
      </div>
    </>
  );
}
