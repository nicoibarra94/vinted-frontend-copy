import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>S'inscrire</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                username: name,
                password: password,
                email: email,
              }
            );
            setData(response.data);
            console.log(data);
            Cookies.set("token", data.token);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleName}
        ></input>
        <input type="email" placeholder="Email" onChange={handleEmail}></input>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePassword}
        ></input>
        <input type="checkbox"></input>
        <label>S'inscrire a notre newsletter</label>
        <p>
          En m'inscrivant je confirma voir lu et accepte les Termes and
          Conditions et Politique de confidialite de Vinteed. Je confirme avor
          au moins 18 ans.
        </p>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
