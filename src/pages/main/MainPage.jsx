import { Outlet } from "react-router-dom";
import "./MainPage.scss";
import Header from "./components/header/Header";
import whatsapp from "../../assets/icons/whatsappFixed.svg";
import Footer from "./components/footer/Footer";
import { Helmet } from "react-helmet";
// import QRCode from "qrcode";
import QRCode from "react-qr-code";
// import $ from "jquery";

export default function MainPage() {
  return (
    <>
      <Helmet>
        <title>Limpio&Sano</title>
      </Helmet>

      <div id="main-page">
        <Header />


        <main className="main">
          <Outlet />
        <div id="qrcode"></div>
        <h2 id="test">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure adipisci at, vero enim totam porro cumque soluta earum maiores et beatae aliquid nulla cupiditate voluptates natus. Illo modi impedit natus?</h2>
<div style={{ background: 'white', padding: '16px' }}>
    <QRCode value={"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"}/>
</div>
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
