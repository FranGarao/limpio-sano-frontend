import { useEffect, useState } from "react";
import useApiRequest from "../../../../hooks/useApiRequest";
import Swal from "sweetalert2";
import { DiAptana } from "react-icons/di";

export default function DBCategories() {
  const [categories, setCategories] = useState([]);
  const { get, post, put, del } = useApiRequest();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    get("/categories/dash")
      .then((data) => {
        setCategories(data.categories);
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
        deleteCategory(id);
      }
    });
  };
  const findCategory = (id) => {
    return categories.find((category) => category?.id === id);
  };
  const alert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  const openEdit = (id) => {
    const categorySelected = findCategory(id);
    console.log(categorySelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="category" type="text" placeholder="Nombre" value='${categorySelected?.title}'/>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const category = document.getElementById("category").value;
        console.log(category);
        console.log(categorySelected?.id);
        put(`/categories/update/${categorySelected?.id}`, {
          category,
        })
          .then((data) => {
            setCategories(data.categories);
            alert(
              "Servicio editado",
              "La categoria fue editada correctamente",
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
              "La categoria fue eliminada correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  const openCreateMenu = () => {
    Swal.fire({
      title: "Crear Categoria",
      html: `
        <input id="title" type="text" placeholder="Categoria" />
        <input id="img" type="text" placeholder="Url imagen" />
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const img = document.getElementById("img").value;
        console.log(title, img);
        post(`/categories/create`, {
          title,
          img,
        })
          .then((data) => {
            console.log("llegue al endpoint", data);
            setCategories(data.categories);
            getCategories();

            alert(
              "Servicio editado",
              "La pregunta fue editada correctamente",
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
      <section className="table">
        <div className="headers">
          <p>Categoria</p>
          <p>Opciones</p>
        </div>

        {categories?.map((category) => (
          <div key={category?.id} className="row">
            <p>{category?.title}</p>
            <div className="services">
              <div className="options">
                <p
                  onClick={() => openCreateMenu(category?.id)}
                  className="options-icon"
                >
                  +
                </p>
                <button onClick={() => openMenu(category?.id)}>
                  <DiAptana className="config-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
