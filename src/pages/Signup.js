import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="signup">
      <h1 className="signup-title">S'inscrire</h1>
      <form
        className="form-signup"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://vinted-test-api.herokuapp.com/user/signup",
              {
                username: name,
                password: password,
                email: email,
              }
            );
            setUser(response.data.token);
            Cookies.set("token", response.data.token);
            navigate("/");
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
        <input id="box-signup" type="checkbox"></input>
        <label>S'inscrire a notre newsletter</label>
        <p>
          En m'inscrivant je confirma voir lu et accepte les Termes and
          Conditions et Politique de confidialite de Vinteed. Je confirme avor
          au moins 18 ans.
        </p>
        <button type="submit">S'inscrire</button>
        <p>Tu as dejà un compte ? Connecte-toi ! </p>
      </form>
    </div>
  );
};

export default Signup;
