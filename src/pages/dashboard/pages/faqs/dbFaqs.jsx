import { useEffect, useState } from "react";
import useApiRequest from "../../../../hooks/useApiRequest";
import Swal from "sweetalert2";
import { DiAptana } from "react-icons/di";

export default function DBFaqs() {
  const [faqs, setFaqs] = useState([]);
  const { get, post, put, del } = useApiRequest();

  useEffect(() => {
    getFaqs();
  }, []);

  const getFaqs = () => {
    get("/faqs")
      .then((data) => {
        setFaqs(data);
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
        deleteFaq(id);
      }
    });
  };
  const findService = (id) => {
    return faqs.find((faq) => faq?.id === id);
  };
  const alert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  const openEdit = (id) => {
    const faqSelected = findService(id);
    console.log(faqSelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="name" type="text" placeholder="Nombre" value='${faqSelected?.title}'/>
        <input id="description" type="text" placeholder="Descripcion" value='${faqSelected?.description}'/>
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
            getFaqs();

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
  const deleteFaq = (id) => {
    del(`/faqs/delete/${id}`)
      .then(() => {
        get("/faqs")
          .then((data) => {
            getFaqs();
            setFaqs(data.faqs);
            alert(
              "Servicio eliminado",
              "La pregunta fue eliminada correctamente",
              "success"
            );
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h1>Preguntas Frecuentes</h1>{" "}
      <section className="table">
        <div className="headers">
          <p>Titulo</p>
          <p>Opciones</p>
        </div>
        {faqs?.map((faq) => (
          <div key={faq?.id} className="row">
            <p>{faq?.title}</p>
            <div className="services">
              <button onClick={() => openMenu(faq?.id)}>
                <DiAptana className="config-icon" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
