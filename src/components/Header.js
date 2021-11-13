import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <Link to="./">
        <img src={Logo} alt="" />
      </Link>
      <input type="text"></input>

      <div className="buttons">
        {token ? (
          <button
            id="button-sedesconecter"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconecter
          </button>
        ) : (
          <div className="buttons">
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="button-seconecter"
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              id="button-seconecter"
            >
              Se connecter
            </button>
          </div>
        )}
      </div>
      <button>Vends tes articles</button>
    </div>
  );
};

export default Header;
