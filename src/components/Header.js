import Logo from "./images/logo.png";

const Header = () => {
  return (
    <div className="header">
      <img src={Logo} alt="" />
      <input type="text"></input>
      <button>S'inscrire / Se connecter</button>
      <button> Vends maintenant</button>
    </div>
  );
};

export default Header;
