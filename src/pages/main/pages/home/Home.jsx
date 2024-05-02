import "./Home.scss";
import Services from "../services/Services";
import About from "../about/About";
import Contact from "../contact/Contact";
import Faqs from "../faqs/Faqs";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | Limpio&Sano</title>
      </Helmet>
      <div className="home">
        <About/>
        <Services />
        <Faqs />
        <Contact />
      </div>
    </>
  );
}
