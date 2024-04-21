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
  /* Método para rotar cards */

  function flipped(event) {
    const flipped = event.currentTarget.closest(".services-content");
    flipped.classList.toggle("flipped");

    const frontRotate = flipped.querySelector(".service-card-front");
    const backRotate = flipped.querySelector(".service-card-back");

    if (flipped.classList.contains("flipped")) {
      backRotate.classList.add("back-rotate");
      frontRotate.classList.add("front-rotate");
    } else {
      frontRotate.classList.remove("front-rotate");
      backRotate.classList.remove("back-rotate");
    }
  }

  /* FIN rotar cards */
  return (
    <>
      <Helmet>
        <title>Servicios | Limpio&Sano</title>
      </Helmet>
      <div className="services-title-ctn">
        <h2>Servicios</h2>
      </div>
      <section className="services-container">
        {services.map((service) => (
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
              <div className="h3-ctn">
                <h3>{service.title}</h3>
              </div>
              <div className="p-ctn">
                <p>{service.description}</p>
              </div>
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
          </article>
        ))} */}
      </section>
    </>
  );
}
