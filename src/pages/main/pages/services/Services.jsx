import { Helmet } from "react-helmet";
// import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Service.scss";
import useApiRequest from "../../../../hooks/useApiRequest";
import Alert from "../../../../hooks/alerts";

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clear, setClear] = useState(0);
  const { get } = useApiRequest();
  useEffect(() => {
    get("/services")
      .then((data) => setServices(data.services))
      .catch((error) => console.log(error));
    get("/categories")
      .then((data) => setCategories(data.categories))
      .catch((error) => console.log(error));
  }, []);

  const handleFilter = (event) => {
    const categoryId = event.target.value;
    if (categoryId === "0") {
      get("/services")
        .then((data) => {
          setServices(data.services);
          setClear(0);
        })
        .catch((error) => console.log(error));
    } else {
      get(`/services/category/${categoryId}`)
        .then((data) => {
          setServices(data.services);
          console.log(services);
          setClear(categoryId);
          console.log(categoryId, clear);
        })
        .catch((error) => console.log(error));
    }
  };
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

  const confirmService = () => {
    Alert(
      "Elija un tipo",
      "Que tipo de servicio desea?",
      "info",
      "Ocasional",
      "Fijo"
    )
      .catch((error) => {
        console.log(error);
      });
  };

  /* FIN rotar cards */
  return (
    <>
      <Helmet>
        <title>Servicios | Limpio&Sano</title>
      </Helmet>
      <div className="container">
        <h2 className="service-title">SERVICIOS</h2>
      </div>

      <div className="filter-ctn">
        <select
          className="filter-btn"
          onChange={handleFilter}
          name="categoryFilter"
          type="text"
        >
          <option value="0">TODAS</option>
          {categories.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.title?.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <section className="services-container">
        {categories.map((category) => (
          <div
            className={category?.id == clear || clear == 0 ? "exist" : "hidden"}
            key={category?.id}
          >
            {clear == 0 && (
              <h2 className="category-title">
                {category?.title?.toUpperCase()}
              </h2>
            )}
            {category?.id == clear && (
              <h2 className="category-title">
                {category?.title?.toUpperCase()}
              </h2>
            )}
            {services.map((service) => (
              <div className="services-content" key={service?.id}>
                <article className="service-card-front">
                  <div className="h3-ctn">
                    <h3>{service?.title.toUpperCase()}</h3>
                  </div>
                  <div className="img-ctn">
                    <img
                      className="img-cover"
                      src={service?.img}
                      alt={`Imagen de ${service?.title}`}
                    />
                  </div>
                  <div className="btn-ctn">
                    <button onClick={confirmService} title="Alquilar">
                      Alquilar
                    </button>
                    <button title="Más información" onClick={flipped}>
                      Más información
                    </button>
                  </div>
                </article>
                {category?.id === service?.category_id && (
                  <article className="service-card-back">
                    <div className="h3-ctn">
                      <h3>{service?.title.toUpperCase()}</h3>
                    </div>
                    <p>{service?.description}</p>
                    <div className="btn-ctn">
                      <button title="Regresar" onClick={flipped}>
                        Regresar
                      </button>
                    </div>
                  </article>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}
