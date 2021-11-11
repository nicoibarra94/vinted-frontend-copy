import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../images/logo.png";

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} alt="" />
      <input type="text"></input>
      <FontAwesomeIcon id="icon" icon="search" />
      <button>S'inscrire</button>
      <button>Se connecter</button>
      <button> Vends tes articles</button>
    </div>
  );
};

export default Header;
