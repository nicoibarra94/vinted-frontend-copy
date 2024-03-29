import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <p className="login-form-title">Se connecter</p>
      <form
        className="login-form"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              "https://vinted-test-api.herokuapp.com/user/login",
              {
                email: email,
                password: password,
              }
            );
            setUser(response.data.token);
          } catch (error) {
            console.log(error);
          }
          const token = Cookies.get("userToken");

          if (token) {
            navigate("/");
          } else {
            alert("This account doesn't exist");
          }
        }}
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
