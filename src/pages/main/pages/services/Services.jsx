import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./Service.scss";
import useApiRequest from "../../../../hooks/useApiRequest";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const confirmService = (service) => {
    Swal.fire({
      title: "Selecciona la regularidad",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Ocasional",
      showDenyButton: true,
      denyButtonText: "Fijo",
      confirmButtonColor: "#009d71",
      denyButtonColor: "#1d30ad",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#00000057",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(`https://wa.me/573225292067?text=¡Hola!%20Queria%20mas%20informacion%20sobre%20el servicio de %20${service}%20que%20ofrecen`, '_blank');
      } else if (result.isDenied) {
        redirect("/contact"); // reemplaza 'url2' con la URL a la que deseas redirigir para el segundo botón
      }
    });

    function redirect(url) {
      navigate(url);
    }
  };

  /* FIN rotar cards */
  return (
    <>
      <Helmet>
        <title>Servicios | Limpio&Sano</title>
      </Helmet>
      <div className="container">
        <h2 className="service-title">Servicios de Limpieza y Aseo</h2>

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
                    <button onClick={()=>confirmService(service?.title)} title="Alquilar">
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
