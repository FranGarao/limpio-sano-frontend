import "./CreateService.scss";
import { useState } from "react";
import CheckLogin from "../../../../hooks/checkLogin";
import useApiRequest from "../../../../hooks/useApiRequest";

export default function CreateService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const { post } = useApiRequest();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDesc = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleImg = (e) => {
    setImage(e.target.value);
  };


  const handleSubmit = (e) => {
    if (CheckLogin()) {
      e.preventDefault();
      const service = {
        title,
        img,
        description,
        category_id: Number(category),
      };
        post("/services/create", service)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          // Maneja el error (por ejemplo, si el token ha expirado)
          console.error({ error });
          return error;
        });
    }
  };

  return (
    <>
      <h1>Create Service</h1>
      <form className="create-product" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={title}
          onChange={handleTitle}
          type="text"
          name="name"
        />
        <label htmlFor="image">Imagen(Url)</label>
        <input
          id="image"
          value={img}
          onChange={handleImg}
          type="text"
          name="image"
        />
        <label htmlFor="price">Precio</label>
        <input
          id="price"
          value={price}
          onChange={handlePrice}
          type="number"
          name="price"
        />
        <select name="category" id="category" onChange={handleCategory}>
          <option value="9">Hogar</option>
          <option value="10">Oficina</option>
          <option value="11">Facultad</option>
          <option value="12">Otro</option>
        </select>
        <label htmlFor="description">Descripcion</label>
        <input
          id="description"
          value={description}
          onChange={handleDesc}
          type="text"
          name="description"
        />
        <button type="submit">Crear</button>
      </form>
    </>
  );
}
