import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../images/logo.png";
import Cookies from "js-cookie";

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} alt="" />
      <input type="text"></input>
      <FontAwesomeIcon id="icon" icon="search" />
      <button>'inscrire</button>
      <button
        className={
          Cookies.get("token") !== undefined
            ? "button-seconecter"
            : "button-sedesconecter "
        }
      >
        Se connecter
      </button>
      <button> Vends tes articles</button>
    </div>
  );
};

export default Header;
