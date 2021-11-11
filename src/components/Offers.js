import { Link } from "react-router-dom";

const Offers = ({ data }) => {
  return (
    <div className="offer-container">
      {data.offers.map((offer, index) => {
        const id = offer._id;
        return (
          <Link className="link" to={`/offer/${id}`}>
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
                    <div className="home-bottom-text">
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
  );
};

export default Offers;
