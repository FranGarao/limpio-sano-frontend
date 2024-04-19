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
    // get("/services")
    //   .then((data) => setServices(data.services))
    //   .catch((error) => console.log(error));
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
      <div>
        <h2>Servicios</h2>
      </div>
      <section className="services-container">
        {service.map((service) => (
          <div className="services-content" key={service.id}>
            <article className="service-card-front">
              <div className="h3-ctn">
                <h3>{service.title}</h3>
              </div>
              <div className="img-ctn">
                <img className="img-cover" src={service.img} />
              </div>
              <div className="btn-ctn">
                <button>Alquilar</button>
                <button onClick={flipped}>Más información</button>
              </div>
            </article>

            <article className="service-card-back">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="btn-ctn">
                <button onClick={flipped}>Regresar</button>
              </div>
            </article>
          </div>
        ))}

        {/* {services.map((service) => (
          <article className="service-card" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
<<<<<<< HEAD
            <img src={services?.img}></img>
            <button>Alquilar</button>
=======
>>>>>>> 9d192cb48dc473d627cc4ca9d32bc9c09461ccfb
          </article>
        ))} */}
      </section>
    </>
  );
}
