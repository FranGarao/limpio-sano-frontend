import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import burgerMenu from "../../../../assets/icons/burgerMenu.svg";
import facebook from "../../../../assets/footer-icons/facebook.svg";
import instagram from "../../../../assets/footer-icons/instagram.svg";
import whatsapp from "../../../../assets/footer-icons/whatsapp.svg";
import xmark from "../../../../assets/icons/xmark.svg";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (showSidebar) {
      setHidden(false);
    }
  }, [showSidebar]);
  return (
    <>
      <img
        // onMouseOver={() => setShowSidebar(true)}
        onClick={() => setShowSidebar(true)}
        className={`${showSidebar ? "hidden" : "burger-menu"}`}
        src={burgerMenu}
        alt=""
      />
      <nav
        // // onMouseOver={() => setShowSidebar(true)}
        // // onMouseOut={() => setShowSidebar(false)}
        className={` ${
          hidden ? "hidden" : showSidebar ? "slideIn" : "slideOut"
        }`}
      >
        <div className="sidebar-header">
          <Link className="sidebar-title" to="home">
            Limpio<b className="special-char">&</b>Sano
          </Link>
          <img
            className="xmark"
            onClick={() => setShowSidebar(false)}
            src={xmark}
            alt="menu de navegacion"
          />
        </div>
        <div className="sidebar-main">
          <ul className="sidebar-list">
            <li>
              <Link to="/home">Inicio</Link>
            </li>
            <li>
              <Link to="/about">¿Quiénes somos?</Link>
            </li>
            <li>
              <Link to="/services">Servicios</Link>
            </li>
            <li>
              <Link to="/faqs">Preguntas Frecuentes</Link>
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-footer">
          <img className="network-icon" src={instagram} alt="instagram" />
          <img className="network-icon" src={facebook} alt="facebook" />
          <img className="network-icon" src={whatsapp} alt="whatsapp" />
        </div>
      </nav>
    </>
  );
}
