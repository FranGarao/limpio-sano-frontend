import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import "../../../main/pages/services/Service.scss";
import Swal from "sweetalert2";
import { DiAptana } from "react-icons/di";
// import "../../";

export default function DContact() {
  const [contacts, setContacts] = useState([]);
  const { get, put, del } = useApiRequest();

  const alert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  const getContacts = () => {
    get("/contacts/dash")
      .then((data) => setContacts(data.contacts))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getContacts();
  }, []);
  console.log(contacts);

  const deleteService = (id) => {
    console.log(id);
    del(`/contacts/delete/${id}`)
      .then(() => {
        get("/contacts")
          .then((data) => {
            setContacts(data.services);
            getContacts();
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

  const findContact = (id) => {
    return contacts.find((contact) => contact?.id === id);
  };

  const openEdit = (id) => {
    console.log({ idTRUE: id });
    const contactSelected = findContact(id);
    console.log(contactSelected);
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="contact" type="text" placeholder="Contacto" value='${contactSelected?.contact}'/>
        ${
          contacts &&
          contacts.length > 0 &&
          `
            <select id="type">
            ${contacts
              .map(
                (contact) =>
                  `<option value="${contact?.type}">${contact?.type}</option>`
              )
              .join("")}
            </select>
            `
        }
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const contact = document.getElementById("contact").value;
        const type = document.getElementById("type").value;
        put(`/contacts/update/${contactSelected?.id}`, {
          contact,
          type,
        })
          .then((data) => {
            setContacts(data.contacts);
            getContacts();
            alert(
              "Contacto editado",
              "El Contacto fue editado correctamente",
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
          <p>Contacto</p>
          <p>Tipo</p>
          <p>Opciones</p>
        </div>
        {contacts?.map((contact) => (
          <div key={contact?.id} className="row">
            <p>{contact?.contact}</p>
            <p>{contact?.type}</p>
            <div className="services">
              <div className="options">
                <button onClick={() => openMenu(contact?.id)}>
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
