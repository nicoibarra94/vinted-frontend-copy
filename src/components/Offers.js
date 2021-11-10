import { Link } from "react-router-dom";

const Offers = ({ data }) => {
  return (
    <div>
      {data.offers.map((offer, index) => {
        const id = offer._id;
        return (
          <Link to={`/product/${id}`}>
            <div className="offer">
              <p>{offer.owner.account.username}</p>
              <div className="imgOffer">
                <div>
                  <img src={offer.product_image.url} alt="" />
                </div>
              </div>

              <p>{offer.product_price}€</p>
              <div>
                {offer.product_details.map((details, index) => {
                  return (
                    <div>
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
