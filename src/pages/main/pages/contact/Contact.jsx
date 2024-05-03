import "./Contact.scss";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  GetCategories,
  GetServiceByCategory,
} from "../../../../hooks/servicesHook";
import useApiRequest from "../../../../hooks/useApiRequest";

export default function Contact() {
  const [clientType, setClientType] = useState(0);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const { post } = useApiRequest();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // setServices(await GetServiceByCategory(data?.establishmentRequired));
    post("/contacts/submit", { data })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    console.log({ data });
    setFormValues(data);
  };

  // console.log(watch("name")); // watch input value by passing the name of it

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

  const handleChange = (e) => {
    e.target.name === "establishment"
      ? (async () => {
          setServices(await GetServiceByCategory(e.target.value));
        })()
      : null;
  };

  const handleClientType = (event) => {
    console.log({ event: event.target.value });
    setClientType(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="contact-title">Contáctanos</h2>
          <div className="contact-ctn">
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
                <option value="0">Razon Social</option>
                <option value="1">Persona Fisica</option>
              </select>
            </div>
            {clientType == 0 ? (
              <div className="name-container">
                <label className="name-label" htmlFor="business-name">
                  Razon Social
                </label>
                <input
                  defaultValue={formValues.bussines}
                  className="name-input"
                  type="text"
                  id="bussines"
                  name="bussines"
                  {...register("bussinesRequired", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    minLength: { value: 3, message: "Minimo 3 caracteres" },
                    maxLength: {
                      value: 20,
                      message: "Maximo 20 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Solo se pueden ingresar letras",
                    },
                  })}
                />
                {/* <input
                  className="hidden"
                  type="text"
                  value="Razon Social"
                  id="name"
                  name="name"
                />
                <input
                  value={'"Razon Social"'}
                  className="hidden"
                  type="text"
                  id="lastName"
                  name="lastName"
                /> */}
                {errors.bussinesRequired && (
                  <span className="error">
                    *{errors.bussinesRequired.message}
                  </span>
                )}
              </div>
            ) : (
              <>
                <div className="name-container">
                  <label className="name-label" htmlFor="name">
                    Nombre
                  </label>
                  {clientType == 1 ? (
                    <input
                      onChange={handleChange}
                      defaultValue={formValues?.name}
                      className="name-input"
                      type="text"
                      id="name"
                      name="name"
                      {...register("nameRequired", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: { value: 3, message: "Minimo 3 caracteres" },
                        maxLength: {
                          value: 20,
                          message: "Maximo 20 caracteres",
                        },
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Solo se pueden ingresar letras",
                        },
                      })}
                    />
                  ) : null}
                  {clientType == 1 && errors.nameRequired && (
                    <span className="error">
                      *{errors.nameRequired.message}
                    </span>
                  )}
                </div>
                <div className="name-container">
                  <label className="name-label" htmlFor="lastName">
                    Apellido
                  </label>
                  <input
                    onChange={handleChange}
                    defaultValue={formValues.lastName}
                    className="name-input "
                    type="text"
                    id="lastName"
                    name="lastName"
                    {...register("lastNameRequired", {
                      required: {
                        value: true,
                        message: "El campo es requerido",
                      },
                      minLength: { value: 3, message: "Minimo 3 caracteres" },
                      maxLength: {
                        value: 20,
                        message: "Maximo 20 caracteres",
                      },
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Solo se pueden ingresar letras",
                      },
                    })}
                  />
                  {errors.lastNameRequired && (
                    <span className="error">
                      *{errors.lastNameRequired.message}
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="email-container">
              <label className="email-label" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                onChange={handleChange}
                defaultValue={formValues.email}
                className="email-input "
                type="email"
                id="email"
                name="email"
                {...register("emailRequired", {
                  required: { value: true, message: "El campo es requerido" },
                  minLength: { value: 3, message: "Minimo 3 caracteres" },
                  maxLength: {
                    value: 20,
                    message: "Maximo 20 caracteres",
                  },
                })}
              />{" "}
              {errors.emailRequired && (
                <span className="error">*{errors.emailRequired.message}</span>
              )}
            </div>
            <div className="phone-container">
              <label className="phone-label" htmlFor="phoneNumber">
                Numero de Teléfono
              </label>
              <input
                readOnly={false}
                onChange={handleChange}
                defaultValue={formValues.phoneNumber}
                className="phone-input "
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                {...register("phoneRequired", {
                  required: { value: true, message: "El campo es requerido" },
                  maxLength: { value: 20, message: "Maximo 20 caracteres" },
                  minLength: { value: 7, message: "Minimo 7 caracteres" },
                  pattern: {
                    value: /^[0-9\b]+$/,
                    message: "Solo se pueden ingresar numeros",
                  },
                })}
              />{" "}
              {errors.phoneRequired && (
                <span className="error">*{errors.phoneRequired.message}</span>
              )}
            </div>
          </div>
          <div className="contact-ctn">
            <div className="location-container">
              <label htmlFor="city">¿En qué ciudad se encuentra?</label>
              <select
                onChange={handleChange}
                defaultValue={formValues.city}
                className="location-select"
                id="city"
                name="city"
                {...register("cityRequired", { required: true })}
              >
                <option value="ibague">Ibagué</option>
                <option value="bogota">Bogotá</option>
              </select>
            </div>
            <div className="service-container">
              <label htmlFor="establishment">¿Qué establecimiento?</label>
              <select
                defaultValue={formValues.establishment}
                className="service-select"
                id="establishment"
                name="establishment"
                {...register("establishmentRequired", { required: true })}
              >
                {categories.map((category) => (
                  <option
                    onClick={async () =>
                      setServices(await GetServiceByCategory(category?.id))
                    }
                    key={category?.id}
                    value={category?.id}
                  >
                    {category?.title.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="service-container">
              <label htmlFor="servicio">¿Qué servicio?</label>
              <select
                onChange={handleChange}
                defaultValue={formValues.service}
                className="service-select"
                id="service"
                name="service"
                {...register("serviceRequired", { required: true })}
              >
                {services.map((service) => (
                  <option key={service?.id} defaultValue={service?.id}>
                    {service?.title.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="contact-ctn">
            <div className="date-container">
              <label htmlFor="" className="date-label">
                Rango de fechas
              </label>
              <div>
                <label htmlFor="startDate">Desde</label>
                <input
                  onChange={handleChange}
                  // defaultValue={formValues.startDate}
                  type="date"
                  className="date-input"
                  name="startDate"
                  defaultValue={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                      .toISOString()
                      .split("T")[0]
                  }
                  {...register("startDateRequired", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    validate: (value) => {
                      const date = new Date(value);
                      if (
                        date.getFullYear() < 2024 ||
                        date.getDay() < new Date().getDay() ||
                        date.getMonth() < new Date().getMonth()
                      ) {
                        return "La fecha debe ser mayor a la actual";
                      }
                    },
                  })}
                />{" "}
                {errors.startDateRequired && (
                  <span className="error">
                    *{errors.startDateRequired.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="endDate">Hasta</label>
                <input
                  onChange={handleChange}
                  defaultValue={
                    new Date(new Date().setMonth(new Date().getMonth() + 1))
                      .toISOString()
                      .split("T")[0]
                  }
                  type="date"
                  name="endDate"
                  className="date-input"
                  {...register("endRequired", {
                    required: { value: true, message: "El campo es requerido" },
                    validate: (value) => {
                      const date = new Date(value);
                      if (
                        date.getFullYear() < 2024 ||
                        date.getDay() < new Date().getDay() ||
                        date.getMonth() < new Date().getMonth()
                      ) {
                        return "La fecha debe ser mayor a la actual";
                      }
                    },
                  })}
                />
                {errors.endRequired && (
                  <span className="error">*{errors.endRequired.message}</span>
                )}
              </div>
            </div>
            <div className="message-container">
              <label className="message-label" htmlFor="message">
                Mensaje
              </label>
              <textarea
                onChange={handleChange}
                defaultValue={formValues.message}
                className="message-textarea"
                id="message"
                name="message"
                {...register("msgRequired", {
                  required: { value: true, message: "El campo es requerido" },
                  minLength: { value: 10, message: "Minimo 10 caracteres" },
                  maxLength: {
                    value: 1000,
                    message: "Maximo 1000 caracteres",
                  },
                })}
              ></textarea>{" "}
              {errors.msgRequired && (
                <span className="error">*{errors.msgRequired.message}</span>
              )}
            </div>
            <button className="submit" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
