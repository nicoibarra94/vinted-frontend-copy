import axios from "axios";
import { useState, useEffect } from "react";
import homeImage from "../images/home-vinted.jpeg";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-test-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span> Loading</span>
  ) : (
    <div className="home">
      <div className="box-image">
        <p> Prêts à faire du tri dans vos placards ?</p>
        <button>Vends maintenant</button>
        <p>Decouvrir comment ça marche</p>
      </div>
      <img src={homeImage} alt="" />
      <div>
        <div className="offer-container">
          {data.offers.map((offer, index) => {
            const id = offer._id;
            return (
              <Link key={id} className="link" to={`/offer/${id}`}>
                <div className="offer">
                  <p>{offer.owner.account.username}</p>
                  <div className="imgOffer">
                    <div>
                      <img src={offer.product_image.url} alt="" />
                    </div>
                  </div>

                  <p className="black">{offer.product_price}€</p>
                  <div>
                    {offer.product_details.map((details, index) => {
                      return (
                        <div key={index} className="home-bottom-text">
                          <p>{details.TAILLE}</p>
                          <p>{details.MARQUE}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
