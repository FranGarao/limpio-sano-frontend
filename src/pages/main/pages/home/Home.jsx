import "./Home.scss";
import { useEffect } from "react";
// import Footer from "../../components/footer/Footer";
import useFetch from "../../../../hooks/useFetch";

import { Helmet } from "react-helmet";
export default function Home() {
  //, loading, error
  const { get } = useFetch();

  useEffect(() => {
    get("/services").then((data) => console.log(data));
  }, []);

  return (
    <>
      <Helmet>
        <title>Inicio | Limpio&Sano</title>
      </Helmet>
      <div className="home">
        {/* <Contact />
        <Faqs /> */}
      </div>
    </>
  );
}
