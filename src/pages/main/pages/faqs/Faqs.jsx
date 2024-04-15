import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./Faqs.scss";
import topArrow from "../../../../assets/icons/topArrow.svg";
import useFetch from "../../../../hooks/useFetch";

export default function Faqs() {
  const faqsData = [
    {
      title: "¿Qué es Limpio&Sano?",
      description:
        "Limpio&Sano es una empresa dedicada a la limpieza y desinfección de hogares y oficinas.",
    },
    {
      title: "¿Qué hacemos?",
      description:
        "Limpio&Sano es una empresa dedicada a la limpieza y desinfección de hogares y oficinas.",
    },
    {
      title: "¿escubidudbi?",
      description:
        "Limpio&Sano es una empresa dedicada a la limpieza y desinfección de hogares y oficinas. lorem",
    },
    // Agrega más preguntas y respuestas aquí
  ];
  const { get } = useFetch();
  const [faqs, setFaqs] = useState([{}]);

  useEffect(() => {
    get("/faqs")
      .then((faqs) => {
        setFaqs(faqs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(faqs);
  const [faqVisibility, setFaqVisibility] = useState(
    Array(faqsData.length).fill(true)
  );

  const toggleFaqVisibility = (index) => {
    const updatedVisibility = [...faqVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setFaqVisibility(updatedVisibility);
  };

  return (
    <>
      <Helmet>
        <title>FAQS | Limpio&Sano </title>
      </Helmet>
      <section className="section-container">
        <h2>Preguntas Frecuentes</h2>
        <section className="faqs-container">
          {faqs.map((faq, index) => (
            <div
              onClick={() => toggleFaqVisibility(index)}
              className="faq"
              key={index}
            >
              <div className="faq-header">
                <h2 className="faq-title">{faq.title}</h2>
                <img
                  className={`${
                    faqVisibility[index] ? "faq-arrow-inverse" : "faq-arrow"
                  }`}
                  src={topArrow}
                  alt=""
                />
              </div>
            <hr   className={`${
                  faqVisibility[index] ? "hr" : "hidden"
                }`} />
              <p
                className={`${
                  faqVisibility[index] ? "faq-description" : "hidden"
                }`}
              >
                {faq.description}
              </p>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
