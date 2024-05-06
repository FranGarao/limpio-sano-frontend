import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./Faqs.scss";
import topArrow from "../../../../assets/icons/topArrow.svg";
import useApiRequest from "../../../../hooks/useApiRequest";
// import jwt_decode from "jwt-decode";

export default function Faqs() {
  // Agrega más preguntas y respuestas aquí
  const { get } = useApiRequest();
  const [faqs, setFaqs] = useState([{}]);

  useEffect(() => {
    get("/faqs")
      .then((response) => {
        console.log({ response });
        setFaqs(response);
      })
      .catch((error) => {
        // Maneja el error (por ejemplo, si el token ha expirado)
        console.error({ error });
      });
  }, []);

  console.log(faqs);
  const [faqVisibility, setFaqVisibility] = useState(
    Array(faqs.length).fill(true)
  );

  const toggleFaqVisibility = (index) => {
    const updatedVisibility = [...faqVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setFaqVisibility(updatedVisibility);
  };

  return (
    <>
      <Helmet>
        <title>FAQS | Limpio&Sano </title>
      </Helmet>
      <section className="section-container">
        <p className="title">¡Bienvenido a nuestras Preguntas Frecuentes!</p>
        <p className="introduction">
          <br />
          <br />
          En nuestra misión por brindar un servicio excepcional y transparente,
          queremos asegurarnos de que tengas toda la información que necesitas
          para aprovechar al máximo nuestros servicios de limpieza. <br />
          <br />
          Hemos recopilado las preguntas más comunes que nuestros clientes
          suelen hacer y las hemos respondido detalladamente para tu
          conveniencia. <br />
          <br />
          Desde conocer los servicios que ofrecemos hasta entender nuestras
          políticas y procesos, estamos aquí para proporcionarte toda la
          orientación que necesites. <br />
          <br />
          Si alguna vez te has preguntado cómo programar una limpieza, qué
          productos utilizamos o qué hacer en caso de cancelación, ¡has llegado
          al lugar correcto! <br />
          <br />
          Nuestro objetivo es garantizar tu completa satisfacción y tranquilidad
          al confiar en nosotros para mantener tu hogar o lugar de trabajo
          limpio y reluciente. <br />
          <br />
          No dudes en explorar nuestras preguntas frecuentes y, si no encuentras
          la respuesta que buscas, no dudes en ponerte en contacto con nuestro
          equipo. <br />
          <br />
          Estamos aquí para ayudarte en cada paso del camino y hacer que tu
          experiencia con nuestros servicios de limpieza sea lo más fluida y
          satisfactoria posible. <br />
          <br />
          ¡Gracias por elegirnos como tu proveedor de servicios de limpieza!
          Estamos emocionados de trabajar contigo y de ayudarte a mantener un
          ambiente limpio y saludable. <br />
          <br />
        </p>
        <section className="faqs-container">
          {faqs.map((faq, index) => (
            <div
              onClick={() => toggleFaqVisibility(index)}
              className="faq"
              key={index}
            >
              <div className="faq-header">
                <h2 className="faq-title">¿{faq.title}?</h2>
                <img
                  className={`${
                    faqVisibility[index] ? "faq-arrow-inverse" : "faq-arrow"
                  }`}
                  src={topArrow}
                  alt=""
                />
              </div>
              <hr className={`${faqVisibility[index] ? "hr" : "hidden"}`} />
              <p
                className={`${
                  faqVisibility[index] ? "faq-description" : "hidden"
                }`}
              >
                {faq.description}
              </p>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
