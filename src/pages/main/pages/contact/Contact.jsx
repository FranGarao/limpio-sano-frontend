import "./Contact.scss";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import {
  GetCategories,
  GetServiceByCategory,
} from "../../../../hooks/servicesHook";

export default function Contact() {
  const [clientType, setClientType] = useState(0);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    bussines: "",
    email: "",
    phoneNumber: "",
    city: "",
    establishment: "",
    service: "",
    startDate: "",
    endDate: "",
    message: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    event.target.name === "establishment"
      ? (async () => {
          setServices(await GetServiceByCategory(event.target.value));
        })()
      : null;
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleClientType = (event) => {
    setClientType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  useEffect(() => {
    GetCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
    (async () => {
      setServices(await GetServiceByCategory(1));
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Contacto | Limpio&Sano</title>
      </Helmet>

      <section className="contact">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-title">Contáctanos</h2>
          <div className="client-container">
            <label htmlFor="client-type" className="client-label">
              Tipo de Cliente
            </label>
            <select
              onChange={handleClientType}
              name="client-type"
              id="client-type"
              className="client-select"
            >
              <option value="0">Empresa - Otro</option>
              <option value="1">Persona xd</option>
            </select>
          </div>
          {clientType == 0 ? (
            <div className="name-container">
              <label className="name-label" htmlFor="business-name">
                Razon Social
              </label>
              <input
                onChange={handleChange}
                value={formValues.bussines}
                className="name-input"
                type="text"
                id="bussines"
                name="bussines"
              />
            </div>
          ) : (
            <>
              <div className="name-container">
                <label className="name-label" htmlFor="name">
                  Nombre
                </label>
                <input
                  onChange={handleChange}
                  value={formValues?.name}
                  className="name-input"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="name-container">
                <label className="name-label" htmlFor="lastName">
                  Apellido
                </label>
                <input
                  onChange={handleChange}
                  value={formValues.lastName}
                  className="name-input "
                  type="text"
                  id="lastName"
                  name="lastName"
                />
              </div>
            </>
          )}

          <div className="email-container">
            <label className="email-label" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              onChange={handleChange}
              value={formValues.email}
              className="email-input "
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="phone-container">
            <label className="phone-label" htmlFor="phoneNumber">
              Numero de Teléfono
            </label>
            <input
              readOnly={false}
              onChange={handleChange}
              value={formValues.phoneNumber}
              className="phone-input "
              type="text"
              id="phoneNumber"
              name="phoneNumber"
            />
          </div>
          <div className="location-container">
            <label htmlFor="city">¿En qué ciudad se encuentra?</label>
            <select
              onChange={handleChange}
              value={formValues.city}
              className="location-select"
              id="city"
              name="city"
            >
              <option value="ibague">Ibagué</option>
              <option value="bogota">Bogotá</option>
            </select>
          </div>
          <div className="service-container">
            <label htmlFor="establishment">¿Qué establecimiento?</label>
            <select
              onChange={handleChange}
              value={formValues.establishment}
              className="service-select"
              id="establishment"
              name="establishment"
            >
              {categories.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.title.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="service-container">
            <label htmlFor="servicio">¿Qué servicio?</label>
            <select
              onChange={handleChange}
              value={formValues.service}
              className="service-select"
              id="service"
              name="service"
            >
              {services.map((service) => (
                <option key={service?.id} value={service?.id}>
                  {service?.title.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="date-container">
            <label htmlFor="" className="date-label">
              Rango de fechas
            </label>
            <div>
              <label htmlFor="startDate">Desde</label>
              <input
                onChange={handleChange}
                value={formValues.startDate}
                type="date"
                className="date-input"
                name="startDate"
              />
            </div>
            <div>
              <label htmlFor="endDate">Hasta</label>
              <input
                onChange={handleChange}
                value={formValues.endDate}
                type="date"
                name="endDate"
                className="date-input "
              />
            </div>
          </div>
          <div className="message-container">
            <label className="message-label" htmlFor="message">
              Mensaje
            </label>
            <textarea
              onChange={handleChange}
              value={formValues.message}
              className="message-textarea"
              id="message"
              name="message"
            ></textarea>
          </div>
          <button className="submit" type="submit">
            Enviar
          </button>
        </form>
      </section>
    </>
  );
}
