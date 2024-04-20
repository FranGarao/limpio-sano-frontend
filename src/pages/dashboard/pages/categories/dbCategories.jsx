import { useEffect, useState } from "react";
import useApiRequest from "../../../../hooks/useApiRequest";
import Swal from "sweetalert2";
export default function DBCategories() {
  const [categories, setCategories] = useState([]);
  const { get, post, put, del } = useApiRequest();

  useEffect(() => {
    get("/categories")
      .then((data) => {
        setCategories(data.categories);
      })
      .catch((error) => console.log(error));
  }, []);
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
        deleteCategory(id);
      }
    });
  };
  const findCategory = (id) => {
    return categories.find((category) => category?.id === id);
  };

  const openEdit = (id) => {
    const categorySelected = findCategory(id);
    console.log(categorySelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="name" type="text" placeholder="Nombre" value='${
          categorySelected?.title
        }'/>
        <input id="description" type="text" placeholder="Descripcion" value='${
          categorySelected?.description
        }'/>
        <input id="image" type="text" placeholder="URL de la imagen" value='${
          categorySelected?.img
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
        console.log(title);
        console.log(categorySelected?.id);
        put(`/categories/update/${categorySelected?.id}`, {
          title,
        })
          .then((data) => {
            setCategories(data.categories);
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
  const deleteCategory = (id) => {
    del(`/categories/delete/${id}`)
      .then(() => {
        get("/categories")
          .then((data) => {
            setCategories(data.categories);
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
  return (
    <>
      <h1>Servicios</h1>{" "}
      <section className="table">
        <div className="headers">
          <p>Nombre</p>
          <p>Categoria</p>
          <p>Opciones</p>
        </div>
        {categories?.map((category) => (
          <div key={category?.id} className="row">
            <p>{category?.title}</p>
            <div className="services">
              <button onClick={() => openMenu(category?.id)}>
                iconoEngranaje
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
