import { useState, useEffect } from "react";
import "./Slider.scss";
import useApiRequest from "../hooks/useApiRequest";
function Slider() {
  const [index, setIndex] = useState(0);
  const { get } = useApiRequest();
  const [images, setImages] = useState([]);
  useEffect(() => {
    get("/slider")
      .then((data) => setImages(data.images))
      .catch((error) => console.log({ error }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia la imagen cada 3 segundos
    return () => clearInterval(timer);
  }, [images]);


  return (
    <>
      <div className="slider">
        <div className="images">
          {images.map((image, i) => (
            <img
              className="slider-image"
              key={i}
              src={image?.url}
              alt=""
              style={{ display: i === index ? "block" : "none" }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
