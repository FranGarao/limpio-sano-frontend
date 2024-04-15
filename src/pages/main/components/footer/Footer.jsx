import "./Footer.scss";
import facebook from "../../../../assets/footer-icons/facebook.svg";
import instagram from "../../../../assets/footer-icons/instagram.svg";
import whatsapp from "../../../../assets/footer-icons/whatsapp.svg";
import phone from "../../../../assets/icons/phone.svg";
import email from "../../../../assets/icons/email.svg";
import location from "../../../../assets/icons/location.svg";
import copy from "../../../../assets/icons/copy.svg";
import Swal from "sweetalert2";

export default function Footer() {
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
          document.execCommand("copy");
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
            <p>+57 322 5292067</p>
            <img
              onClick={() => {
                copyToClipboard("+57 322 5292067");
              }}
              className="copy-contact"
              src={copy}
              alt="copy icon"
            />
          </div>
          <div>
            <img className="icon" src={phone} alt="phone icon" />
            <p>3124641455 - 3225292067</p>
            <img
              onClick={() => {
                copyToClipboard("3124641455 - 3225292067");
              }}
              className="copy-contact"
              src={copy}
              alt="copy icon"
            />
          </div>
          <div>
            <img className="icon" src={email} alt="email icon" />
            <p>comercial@limpioysanosas.com</p>
            <img
              onClick={() => {
                copyToClipboard("comercial@limpioysanosas.com");
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
            <p>Calle 85 # 22A-39 Barrio Polo (Solo correspondencia)</p>
            <img
              onClick={() => {
                copyToClipboard("Calle 85 # 22A-39 Barrio Polo");
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
