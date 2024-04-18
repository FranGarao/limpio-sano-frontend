import { Helmet } from "react-helmet";
// import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Service.scss";
import useApiRequest from "../../../../hooks/useApiRequest";

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const { get } = useApiRequest();
  useEffect(() => {
    get("/services")
      .then((data) => setServices(data.services))
      .catch((error) => console.log(error));
    get("/categories")
      .then((data) => setCategories(data.categories))
      .catch((error) => console.log(error));
  }, []);
  console.log(categories);
  return (
    <>
      <Helmet>
        <title>Servicios | Limpio&Sano</title>
      </Helmet>
      <section className="services-container">
        <div>
          <h2>Servicios</h2>
        </div>

        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <img src={services?.img}></img>
            <button>Alquilar</button>
          </article>
        ))}
      </section>
    </>
  );
}
