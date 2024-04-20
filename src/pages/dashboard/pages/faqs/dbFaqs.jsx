import { useEffect, useState } from "react";
import useApiRequest from "../../../../hooks/useApiRequest";
import Swal from "sweetalert2";

export default function DBFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [id, setId] = useState(null);
  const { get, post, put, del } = useApiRequest();

  useEffect(() => {
    get("/faqs")
      .then((data) => {
        setFaqs(data);
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
        deleteFaq(id);
      }
    });
  };
  const findService = (id) => {
    return faqs.find((faq) => faq?.id === id);
  };

  const openEdit = (id) => {
    const faqSelected = findService(id);
    console.log(faqSelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="name" type="text" placeholder="Nombre" value='${
          faqSelected?.title
        }'/>
        <input id="description" type="text" placeholder="Descripcion" value='${
          faqSelected?.description
        }'/>
        <input id="image" type="text" placeholder="URL de la imagen" value='${
          faqSelected?.img
        }'/>
        ${
          faqs &&
          faqs.length > 0 &&
          `
            <select id="category_id">
            ${faqs
              .map((faq) => `<option value="${faq.id}">${faq.title}</option>`)
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
        console.log(title, description);

        put(`/faqs/update/${faqSelected?.id}`, {
          title,
          description,
        })
          .then((data) => {
            console.log("llegue al endpoint", data);
            setFaqs(data.faqs);

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
  const deleteFaq = (id) => {
    del(`/faqs/delete/${id}`)
      .then(() => {
        get("/faqs")
          .then((data) => {
            setFaqs(data.faqs);
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
        {faqs?.map((faq) => (
          <div key={faq?.id} className="row">
            <p>{faq?.title}</p>
            <div className="services">
              <button onClick={() => openMenu(faq?.id)}>iconoEngranaje</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

// {categories?.map(
//     (category) =>
//       services &&
//       services
//         .filter((service) => service?.category_id === category?.id)
//         .map((service) => (
//           <div key={service?.id} className="row">
//             <p>{service?.title}</p>
//             <h2>{category?.title}</h2>
//             <div className="services">
//               <button onClick={() => openMenu(service?.id)}>
//                 iconoEngranaje
//               </button>
//             </div>
//           </div>
//         ))
//   )}
