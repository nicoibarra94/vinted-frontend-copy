import React, { useCallback } from "react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const [preview, setPreview] = useState();

  const navigate = useNavigate();

  const userToken = Cookies.get("userToken");

  const onDrop = useCallback((acceptedFiles) => {}, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

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
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-background">
      <form className="publish-form" onSubmit={handleSubmit}>
        <h2>Vends ton article</h2>
        <div className="publish-dropzone" {...getRootProps()}>
          <div className="publish-dropzone-box">
            <input
              id="dropzone"
              {...getInputProps()}
              onChange={(event) => {
                setFile(event.target.files[0]);
                setPreview(URL.createObjectURL(event.target.files[0]));
              }}
            />

            <img src={preview} />

            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>

        {/* <input
      type="file"
      onChange={(event) => {
        setFile(event.target.files[0]);
      }}
    /> */}

        <div className="form-title-description-box">
          <div className="publish-form-title">
            <p>Titre</p>
            <input
              value={title}
              style={{ marginLeft: "522px" }}
              type="text"
              placeholder="ex: Chemise Sèzane verte"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="publish-form-description">
            <p>Decris ton article</p>
            <input
              value={description}
              style={{ marginLeft: "428px" }}
              type="text"
              placeholder="ex: porté quelquefois, taille correctement "
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-title-description-brand-box">
          <div className="publish-form-title">
            <p>Marque</p>
            <input
              value={brand}
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div className="publish-form-title">
            <p>Taille</p>
            <input
              value={size}
              style={{ marginLeft: "515px" }}
              type="text"
              placeholder="ex: L / 40/ 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div className="publish-form-title">
            <p>Couleur</p>
            <input
              value={color}
              type="text"
              placeholder="ex: Fushia"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div className="publish-form-title">
            <p>Etat</p>
            <input
              valu={condition}
              style={{ marginLeft: "528px" }}
              type="text"
              placeholder="ex: Neuf avec étiquette"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div className="publish-form-title">
            <p>Lieu</p>
            <input
              value={city}
              style={{ marginLeft: "526px" }}
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-title-description-price">
          <div className="publish-form-title">
            <p>Prix</p>
            <input
              value={price}
              style={{ marginLeft: "528px" }}
              type="number"
              placeholder="0,00 €"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
        </div>
        <button className="button-publish" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  ) : (
    <Navigate to={"/login"} state={{ fromPublish: true }} />
  );
};

export default Publish;
