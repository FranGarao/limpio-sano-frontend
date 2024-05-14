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
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [selected, setSelected] = useState(true);

  useEffect(() => {
          for (let i = 0; i < 6; i++) {
          const btn2 = document.getElementById(i);
          btn2.classList.add("select-btn");
        }
  }, [])

  const setClass = (value) => {
    const btn = document.getElementById(value);
    switch (value) {
      case value:
        for (let i = 0; i < 6; i++) {
          const btn2 = document.getElementById(i);
          btn2.classList.remove("selected");
          console.log({btn2});
          btn2.classList.add("select-btn");
        }
        btn.classList.add("selected");
        btn.classList.remove("select-btn");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Limpio&Sano</title>
      </Helmet>

      <div id="dashboard-page">
        <Header />

        <main className="main">
          <h2>Panel de control</h2>
          <div>
            <Link to="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/services">
              <button id="0" onClick={()=> setClass(0)}>
                Servicios
              </button>
            </Link>
            <Link to="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/users">
              <button onClick={()=> setClass(1)} id="1" >Usuarios</button>
            </Link>
            <Link to="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/faqs">
              <button id="2" onClick={()=> setClass(2)}>Faqs</button>
            </Link>
            <Link to="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/about">
              <button id="3" onClick={()=> setClass(3)}>About Me</button>
            </Link>
            <Link to="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/categories">
              <button id="4" onClick={()=> setClass(4)}>Categorias</button>
            </Link>
            <Link to="/4a70ee7b6091dd9e951975b25f7f101fd9d3f6a18f7b170ec5da1a2b38ad8b14/contact">
              <button id="5" onClick={()=> setClass(5)}>Contacto</button>
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
