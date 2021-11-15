import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Publish = () => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const userToken = Cookies.get("userToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", price);

    try {
      const response = await axios.post(
        "https://vinted-test-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <p>Titre</p>
        <input
          type="text"
          placeholder="ex: Chemise Sèzane verte"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <p>Decris ton article</p>
        <input
          type="text"
          placeholder="ex: porté quelquefois, taille correctement "
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <p>Marque</p>
        <input
          type="text"
          placeholder="ex: Zara"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <p>Taille</p>
        <input
          type="text"
          placeholder="ex: L / 40/ 12"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <p>Couleur</p>
        <input
          type="text"
          placeholder="ex: Fushia"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <p>Etat</p>
        <input
          type="text"
          placeholder="ex: Neuf avec étiquette"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <p>Lieu</p>
        <input
          type="text"
          placeholder="ex: Paris"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <p>Prix</p>
        <input
          type="number"
          placeholder="0,00 €"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default Publish;
