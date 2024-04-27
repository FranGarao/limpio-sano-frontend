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
import useApiRequest from "../../hooks/useApiRequest";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // const { isLoggedIn } = useContext(AuthContext);
  const { get } = useApiRequest();
  const [response, setResponse] = useState(null);
  // if (!isLoggedIn) {
  //   console.log("ta logueado");
  // }
  const verify = () => {
    get("/users/verify/session")
      .then((res) => {
        setResponse(res.ok);
        console.log(res);
      })
      .catch((error) => {
        setResponse(error.ok);
        console.log(error);
      });
  };

  useEffect(() => {
    verify();
    //TODO: agregar que se borren las cookies si no esta logueado (opcional)
    response ? null : window.location.replace("/home");
  }, []);

  console.log({response});
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
          {/* <div id="qrcode"></div>
        <h2 id="test">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure adipisci at, vero enim totam porro cumque soluta earum maiores et beatae aliquid nulla cupiditate voluptates natus. Illo modi impedit natus?</h2>
<div style={{ background: 'white', padding: '16px' }}>
    <QRCode value={"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"}/>
</div> */}
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
