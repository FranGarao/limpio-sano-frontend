import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import "./Faqs.scss";
import topArrow from "../../../../assets/icons/topArrow.svg";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";

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

  // useEffect(() => {
  //   get("/faqs")
  //     .then((faqs) => {
  //       setFaqs(faqs);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {

const api = axios.create({
  baseURL: 'http://localhost:4567/api',
});
// Obtén el token de las cookies
const token = Cookies.get('token');
console.log({token});
const doc = document.cookie;
console.log({doc});
// Obtén el token de las cookies (debes implementar esto)
console.log({token});
// Configura el token en Axios
// api.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzMTk3ODU5LCJleHAiOjE3MTMyODQyNTl9.g737kJIcCYjJBvdcwFnmj_47co2vbUZFs_sJX9h1L6Y`;

// Ahora puedes hacer solicitudes a tu backend
api.get('/faqs', {
  withCredentials: true, // Esta línea es importante
  headers: {
    'Authorization': `${token}`,
  }
})
  .then((response) => {
    console.log( response.data );
    setFaqs(response.data);
  })
  .catch((error) => {
    // Maneja el error (por ejemplo, si el token ha expirado)
    console.error({errrrrr: error});
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
