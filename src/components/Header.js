import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  token,
  setUser,
  search,
  setSearch,
  isToggled,
  setIsToggled,
}) => {
  const userToken = Cookies.get("userToken");

  const navigate = useNavigate();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    navigate("/offers/:title/:sort");
  };

  const onToggle = () => {
    setIsToggled(!isToggled);
    navigate("/offers/:title/:sort");
  };

  return (
    <div className="header">
      <Link to="./">
        <img src={Logo} alt="" />
      </Link>

      <input
        type="text"
        placeholder="Recherche des articles"
        value={search}
        onChange={handleChangeSearch}
      ></input>

      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className="switch" />
      </label>

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
      <button
        onClick={() => {
          if (userToken) {
            navigate("/publish");
          } else {
            navigate("/login");
          }
        }}
      >
        Vends tes articles
      </button>
    </div>
  );
};

export default Header;
