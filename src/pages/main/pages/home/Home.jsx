import "./Home.scss";
import Services from "../services/Services";
import Slider from "../../../../components/Slider"
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
        <Slider />
        <About/>
        <Services />
        <Faqs />
        <Contact />
      </div>
    </>
  );
}
