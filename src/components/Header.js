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
  priceMax,
  setPriceMax,
  priceMin,
  setPriceMin,
}) => {
  const userToken = Cookies.get("userToken");

  const navigate = useNavigate();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    navigate("/offers/:title/:priceMin/:priceMax/:sort");
  };

  const onToggle = () => {
    setIsToggled(!isToggled);
    navigate("/offers/:title/:priceMin/:priceMax/:sort");
  };

  const handleChangePriceMax = (event) => {
    setPriceMax(event.target.value);
    navigate("/offers/:title/:priceMin/:priceMax/:sort");
  };

  const handleChangePriceMin = (event) => {
    setPriceMin(event.target.value);
    navigate("/offers/:title/:priceMin/:priceMax/:sort");
  };

  return (
    <div className="header">
      <Link to="./">
        <img src={Logo} alt="" />
      </Link>
      <div>
        <input
          type="text"
          placeholder="Recherche des articles"
          value={search}
          onChange={handleChangeSearch}
        ></input>

        <div className="container-switch">
          <p>Croissant</p>
          <label className="toggle-switch">
            <input type="checkbox" checked={isToggled} onChange={onToggle} />
            <span className="switch" />
          </label>
          <p>Descendent</p>

          <div className="switch-filters-asc-desc">
            <p>Prix max</p>
            <input
              type="number"
              placeholder="1000"
              value={priceMax}
              onChange={handleChangePriceMax}
            />
            <span>€</span>
            <p>Prix min</p>
            <input
              type="number"
              placeholder="0"
              value={priceMin}
              onChange={handleChangePriceMin}
            ></input>
            <span>€</span>
          </div>
        </div>
      </div>

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
