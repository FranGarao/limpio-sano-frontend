import "./Contact.scss";
import { Helmet } from "react-helmet";
// import emailjs from "emailjs-com";

export default function Contact() {
  const handleSubmit = (event) => {
    //   event.preventDefault();
    //   const name = event.target.elements.name.value;
    //   const lastName = event.target.elements.lastName.value;
    //   const email = event.target.elements.email.value;
    //   const phoneNumber = event.target.elements.phoneNumber.value;
    //   const city = event.target.elements.city.value;
    //   const establishment = event.target.elements.establishment.value;
    //   const message = event.target.elements.message.value;
    //   const finalEmail = {
    //     name,
    //     lastName,
    //     email,
    //     phoneNumber,
    //     city,
    //     establishment,
    //     message,
    //   };
    //   console.log(finalEmail);
    //   // emailjs.init("user_your_emailjs_user_id");
    //   // Envía el correo electrónico
    //   // emailjs
    //     .sendForm(
    //       "your_service_id",
    //       "your_template_id",
    //       finalEmail,
    //       "user_your_emailjs_user_id"
    //     )
    //     .then((result) => {
    //       console.log("Correo electrónico enviado correctamente", result.text);
    //     })
    //     .catch((error) => {
    //       console.error("Error al enviar el correo electrónico", error);
    //     });
    //   return finalEmail;
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Limpio&Sano</title>
      </Helmet>

      <section className="contact">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-title">Contáctanos</h2>
          <div className="name-container">
            <label className="name-label" htmlFor="name">
              Nombre
            </label>
            <input className="name-input" type="text" id="name" />
          </div>
          <div className="name-container">
            <label className="name-label" htmlFor="lastName">
              Apellido
            </label>
            <input className="name-input" type="text" id="lastName" />
          </div>
          <div className="email-container">
            <label className="email-label" htmlFor="email">
              Correo Electrónico
            </label>
            <input className="email-input" type="email" id="email" />
          </div>
          <div className="phone-container">
            <label className="phone-label" htmlFor="phoneNumber">
              Numero de Teléfono
            </label>
            <input className="phone-input" type="text" id="phoneNumber" />
          </div>
          <div className="location-container">
            <label htmlFor="city">¿En qué ciudad se encuentra?</label>
            <select className="location-select" id="city">
              <option value="ibague">Ibagué</option>
              <option value="bogota">Bogotá</option>
            </select>
          </div>
          <div className="service-container">
            <label htmlFor="establishment">¿Qué establecimiento?</label>
            <select className="service-select" id="establishment">
              <option value="casa">Casa</option>
              <option value="oficina">Oficina</option>
              <option value="empresa">Empresa</option>
              <option value="cafeteria">Cafetería</option>
              <option value="horizontal">Propiedad Horizontal</option>
            </select>
          </div>
          <div className="message-container">
            <label className="message-label" htmlFor="message">
              Mensaje
            </label>
            <textarea className="message-textarea" id="message"></textarea>
          </div>
          <button className="submit" type="submit">
            Enviar
          </button>
        </form>
      </section>
    </>
  );
}
