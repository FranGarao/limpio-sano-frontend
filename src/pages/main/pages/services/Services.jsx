import { Helmet } from "react-helmet";
// import { Outlet } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { useEffect, useState } from "react";
import "./Service.scss";

export default function Services() {
  const { get } = useFetch();
  // const [services, setServices] = useState([]);
  
  const [categories, setCategories] = useState([]);

  /* Array de objetos de PRUEBA */
  const service = [
    {
      id: 1,
      title: "Maestranza",
      category: "",
      img: "",
      description: "lalalalalalalalalalalalalala lalalalalalalalalalalalalala lalalalalalalalalalalalalala"
    },
    {
      id: 2,
      title: "Artículos",
      category: "",
      img: "",
      description: "lalalalalalalalalalalalalala lalalalalalalalalalalalalala lalalalalalalalalalalalalala"
    },
    {
      id: 3,
      title: "Sastrería",
      category: "",
      img: "",
      description: "lalalalalalalalalalalalalala lalalalalalalalalalalalalala lalalalalalalalalalalalalala"
    }
  ];

  /* FIN Array de objetos de PRUEBA */

  /* Método para rotar cards */

  function flipped(event) {
    const flipped = event.currentTarget.closest('.services-content');
    flipped.classList.toggle('flipped');

    const frontRotate = flipped.querySelector('.service-card-front');
    const backRotate = flipped.querySelector('.service-card-back');
    
    if ((flipped.classList.contains('flipped'))) {
      backRotate.classList.add('back-rotate');
      frontRotate.classList.add('front-rotate');
    } else {
      frontRotate.classList.remove('front-rotate');
      backRotate.classList.remove('back-rotate');
    }
  }

  /* FIN rotar cards */

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
              <h3>{service.title}</h3>
              <button>Alquilar</button>
              <button onClick={flipped}>Rotate</button>
            </article>

            <article className="service-card-back">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button onClick={flipped}>Rotate</button>
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
