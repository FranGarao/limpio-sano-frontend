// import { useContext } from "react";
// import { AuthContext } from "./components/AuthContext";
// import CreateService from "./components/create/CreateService";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "../main/components/header/Header";
import Footer from "../main/components/footer/Footer";
import whatsapp from "../../assets/footer-icons/whatsapp.svg";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Limpio&Sano</title>
      </Helmet>

      <div id="dashboard-page">
        <Header />

        <main className="main">
          <h1>Bienvenido al panel de control</h1>
          <div>
            <Link to="/dashboard/services">
              <button>Servicios</button>
            </Link>
            <Link to="/dashboard/users">
              <button>Usuarios</button>
            </Link>
            <Link to="/dashboard/faqs">
              <button>Faqs</button>
            </Link>
            <Link to="/dashboard/about">
              <button>About Me</button>
            </Link>
            <Link to="/dashboard/categories">
              <button>Categorias</button>
            </Link>
            <Link to="/dashboard/contact">
              <button>Contacto</button>
            </Link>
          </div>
          <Outlet />
        </main>
        <a
          href={`https://wa.me/573225292067?text=¡Hola!%20Queria%20mas%20informacion%20sobre%20los servicios%20que%20ofrecen`}
          target="_blank"
        >
          <img
            className="whatsapp-fixed"
            src={whatsapp}
            alt="icono de whatsapp"
          />
        </a>
        <Footer />
      </div>
    </>
  );
}
