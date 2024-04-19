import "./Home.scss";
import Services from "../services/Services";

import { Helmet } from "react-helmet";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Inicio | Limpio&Sano</title>
      </Helmet>
      <div className="home">
        <Services />
        {/* <Contact />
        <Faqs /> */}
      </div>
    </>
  );
}
