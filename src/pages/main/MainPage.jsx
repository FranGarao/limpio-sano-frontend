import { Outlet } from "react-router-dom";
import "./MainPage.scss";
import Header from "./components/header/Header";
import whatsapp from "../../assets/icons/whatsappFixed.svg";
import Footer from "./components/footer/Footer";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { GoChevronUp } from "react-icons/go";

export default function MainPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>Limpio&Sano</title>
      </Helmet>

      <div id="main-page">
        <Header />
        <main className="main">
          {scrollY > 500 ? (
            <button
              title="Ir al inicio"
              className="to-top"
              href="#header"
              onClick={toTop}
            >
              <GoChevronUp className="to-top-icon" />
            </button>
          ) : null}
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
