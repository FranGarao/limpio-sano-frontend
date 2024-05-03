import "./Footer.scss";
import facebook from "../../../../assets/footer-icons/facebook.svg";
import instagram from "../../../../assets/footer-icons/instagram.svg";
import whatsapp from "../../../../assets/footer-icons/whatsapp.svg";
import iphone from "../../../../assets/icons/phone.svg";
import iemail from "../../../../assets/icons/email.svg";
import location from "../../../../assets/icons/location.svg";
import copy from "../../../../assets/icons/copy.svg";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useApiRequest from "../../../../hooks/useApiRequest";

export default function Footer() {
  const [wsp, setWsp] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { get } = useApiRequest();
  useEffect(() => {
    get("/contacts")
      .then((res) => {
        console.log(res.contacts);
        res?.contacts?.forEach((contact) => {
          if (contact.type === "whatsapp") setWsp(contact?.contact);
          if (contact.type === "phone") setPhone(contact?.contact);
          if (contact.type === "phone2") setPhone2(contact?.contact);
          if (contact.type === "mail") setEmail(contact?.contact);
          if (contact.type === "direccion") setAddress(contact?.contact);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const copyToClipboard = async (text) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        Swal.fire({
          title: "¡Copiado al portapapeles!",
          confirmButtonText: "Confirmar",
          confirmButtonColor: "#009d71",
        });
      } catch (error) {
        console.log("Error al copiar texto: ", error);
      }
    } else {
      if ("clipboard" in navigator) {
        try {
          await navigator.clipboard.writeText(text);
          Swal.fire({
            title: "¡Copiado al portapapeles!",
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#009d71",
          });
        } catch (error) {
          console.error("Error al copiar texto: ", error);
        }
      } else {
        // Fallback para navegadores que no soportan clipboard API
        try {
          await navigator.clipboard.writeText(text);
          Swal.fire({
            title: "¡Copiado al portapapeles!",
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#009d71",
          });
        } catch (error) {
          console.error("Error al copiar texto: ", error);
        }
      }
    }
  };

  return (
    <footer className="footer">
      <section className="main-footer">
        <div className="footer-container">
          <h5>Nuestras redes</h5>
          <div>
            <img
              className="network-icon"
              src={instagram}
              alt="instagram icon"
            />
            <img className="network-icon" src={facebook} alt="facebook icon" />
            <img className="network-icon" src={whatsapp} alt="whatsapp icon" />
          </div>
        </div>
        <div className="footer-container">
          <h5>Contacto</h5>
          <div>
            <img className="icon" src={whatsapp} alt="whatsapp icon" />
            <p>{wsp}</p>
            <img
              onClick={() => {
                copyToClipboard(wsp);
              }}
              className="copy-contact"
              src={copy}
              alt="copy icon"
            />
          </div>
          <div>
            <img className="icon" src={iphone} alt="phone icon" />
            <p>
              {phone} - {phone2}
            </p>
            <img
              onClick={() => {
                copyToClipboard(`${phone} ${phone2}`);
              }}
              className="copy-contact"
              src={copy}
              alt="copy icon"
            />
          </div>
          <div>
            <img className="icon" src={iemail} alt="email icon" />
            <p>{email}</p>
            <img
              onClick={() => {
                copyToClipboard(email);
              }}
              className="copy-contact"
              src={copy}
              alt="copy icon"
            />
          </div>
        </div>
        <div className="footer-container">
          <h5>Nuestra sede</h5>
          <div className="location-container">
            <img className="icon" src={location} alt="instagram" />
            <p>{address} (Solo correspondencia)</p>
            <img
              onClick={() => {
                copyToClipboard(address);
              }}
              className="copy-contact"
              src={copy}
              alt="copy icon"
            />
          </div>
        </div>
      </section>
      <section className="footer-footer">
        <p>Copyright © Limpio y Sano SAS 2023</p>
        <p>designed & developed by frandev</p>
      </section>
    </footer>
  );
}
