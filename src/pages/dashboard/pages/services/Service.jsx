import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import "../../../main/pages/services/Service.scss";
import Swal from "sweetalert2";

export default function Service() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const { get, post, put, del } = useApiRequest();

  const alert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  const getServices = () => {
    get("/services")
      .then((data) => setServices(data.services))
      .catch((error) => console.log(error));
  };
  const getCategories = () => {
    get("/categories")
      .then((data) => setCategories(data.categories))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getServices();
    getCategories();
  }, []);
  console.log(services, categories);
  const findService = (id) => {
    return services.find((service) => service?.id === id);
  };
  const deleteService = (id) => {
    del(`/services/delete/${id}`)
      .then(() => {
        get("/services")
          .then((data) => {
            setServices(data.services);
            alert(
              "Servicio eliminado",
              "El servicio fue eliminado correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  const openMenu = (id) => {
    Swal.fire({
      title: "Opciones",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Editar`,
      confirmButtonColor: "#009d71",
      denyButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        openEdit(id);
      } else if (result.isDenied) {
        deleteService(id);
      }
    });
  };

  const openEdit = (id) => {
    const serviceSelected = findService(id);
    console.log(serviceSelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="name" type="text" placeholder="Nombre" value='${
          serviceSelected?.title
        }'/>
        <input id="description" type="text" placeholder="Descripcion" value='${
          serviceSelected?.description
        }'/>
        <input id="image" type="text" placeholder="URL de la imagen" value='${
          serviceSelected?.img
        }'/>
        ${
          categories &&
          categories.length > 0 &&
          `
            <select id="category_id">
            ${categories
              .map(
                (category) =>
                  `<option value="${category.id}">${category.title}</option>`
              )
              .join("")}
            </select>
            `
        }
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const img = document.getElementById("image").value;
        const category_id = document.getElementById("category_id").value;
        console.log(title, description, img);
        put(`/services/update/${serviceSelected?.id}`, {
          title,
          description,
          img,
          category_id,
        })
          .then((data) => {
            setServices(data.services);
            getCategories();
            getServices();
            alert(
              "Servicio editado",
              "El servicio fue editado correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <>
      <h1>Servicios</h1>{" "}
      <section className="table">
        <div className="headers">
          <p>Nombre</p>
          <p>Categoria</p>
          <p>Opciones</p>
        </div>
        {categories?.map(
          (category) =>
            services &&
            services
              .filter((service) => service?.category_id === category?.id)
              .map((service) => (
                <div key={service?.id} className="row">
                  <p>{service?.title}</p>
                  <h2>{category?.title}</h2>
                  <div className="services">
                    <button onClick={() => openMenu(service?.id)}>
                      iconoEngranaje
                    </button>
                  </div>
                </div>
              ))
        )}
      </section>
    </>
  );
}
