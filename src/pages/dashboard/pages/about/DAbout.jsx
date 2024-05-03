import useApiRequest from "../../../../hooks/useApiRequest";
import { useEffect, useState } from "react";
import "../../../main/pages/services/Service.scss";
import Swal from "sweetalert2";
import { DiAptana } from "react-icons/di";

export default function DAbout() {
  const [sliderImages, setSliderImages] = useState([]);
  const { get, put, post, del } = useApiRequest();

  const alert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };
  const getSliderImages = () => {
    get("/slider")
      .then((data) => setSliderImages(data.images))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSliderImages();
  }, []);
  console.log(sliderImages);

  const deleteImage = (id) => {
    console.log(id);
    del(`/slider/delete/${id}`)
      .then(() => {
        get("/slider")
          .then((data) => {
            setSliderImages(data.images);
            getSliderImages();
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
        deleteImage(id);
      }
    });
  };

  const findContact = (id) => {
    return sliderImages.find((image) => image?.id === id);
  };

  const openEdit = (id) => {
    console.log({ idTRUE: id });
    const contactSelected = findContact(id);
    console.log(contactSelected);
    Swal.fire({
      title: "Editar URL",
      html: `
        <input id="url" type="text" placeholder="Contacto" value='${contactSelected?.url}'/>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const url = document.getElementById("url").value;
        put(`/slider/update/${contactSelected?.id}`, {
          url,
        })
          .then((data) => {
            setSliderImages(data.contacts);
            getSliderImages();
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

  const openCreateMenu = () => {
    Swal.fire({
      title: "Editar Servicio",
      html: `
        <input id="url" type="text" placeholder="url" />
    
        }
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const url = document.getElementById("url").value;

        post(`/slider/create`, {
          url,
        })
          .then((data) => {
            setSliderImages(data.img);
            getSliderImages();
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
          <p>Imagen</p>
          <p>Opciones</p>
        </div>
        {sliderImages?.map((img) => (
          <div key={img?.id} className="row">
            <p>{img?.id}</p>
            <div className="services">
              <div className="options">
                <p
                  onClick={() => openCreateMenu(img?.id)}
                  className="options-icon"
                >
                  +
                </p>
                <button onClick={() => openMenu(img?.id)}>
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
