import "./Contact.scss";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import {
  GetServices,
  GetCategories,
  GetServiceByCategory,
} from "../../../../hooks/servicesHook";

export default function Contact() {
  const [clientType, setClientType] = useState(0); // [0, 1]
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [servicesByCat, setservicesByCat] = useState(0);
  const handleClientType = (event) => {
    setClientType(event.target.value);
  };

  const handleCategory = async (event) => {
    console.log(event.target.value);
    setservicesByCat(event.target.value);
    if (servicesByCat) {
      setServices(await GetServiceByCategory(servicesByCat));
    }
  };

  useEffect(() => {
    GetCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
    GetServices()
      .then((data) => setServices(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Helmet>
        <title>Contacto | Limpio&Sano</title>
      </Helmet>

      <section className="contact">
        <form className="contact-form">
          <h2 className="contact-title">Contáctanos</h2>
          <select
            onChange={handleClientType}
            name="client-type"
            id="client-type"
          >
            <option value="0">Empresa - Otro</option>
            <option value="1">Persona xd</option>
          </select>
          {clientType == 0 ? (
            <div className="name-container">
              <label className="name-label" htmlFor="business-name">
                Razon Social
              </label>
              <input className="name-input" type="text" id="name" />
            </div>
          ) : (
            <>
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
            </>
          )}

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
            <select
              onChange={handleCategory}
              className="service-select"
              id="establishment"
            >
              {categories.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.title.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="service-container">
            <label htmlFor="establishment">¿Qué servicio?</label>
            <select className="service-select" id="establishment">
              {services.map((service) => (
                <option key={service?.id} value={service?.id}>
                  {service?.title.toUpperCase()}
                </option>
              ))}
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
