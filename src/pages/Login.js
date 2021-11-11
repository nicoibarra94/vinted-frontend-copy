import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <p>Se connecter</p>
      <form
        onSubmit={useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                { email: "brice@lereacteur.io", password: "azerty" }
              );
              setData(response.data);
              console.log(data);
              Cookies.set("token", data);
            } catch (error) {
              console.log(error.message);
            }
          };
          fetchData();
        }, [])}
      >
        <input
          onChange={handleEmail}
          type="email"
          placeholder="Adresse email"
          value={email}
        ></input>
        <input
          onChange={handlePassword}
          type="password"
          placeholder="Mot de passe"
          value={password}
        ></input>
        <button type="submit"> Se connecter</button>
      </form>
      <p>Pas encore de compte? Inscris-toi !</p>
    </div>
  );
};

export default Login;
