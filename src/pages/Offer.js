import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span> Loading </span>
  ) : (
    <div className="route-offer-cointaner">
      <div className="route-offer">
        <div>
          <img src={data.product_image.secure_url} alt="" />
        </div>
        <div className="route-texts">
          <p className="black-price">{data.product_price} €</p>
          <div>
            <div>
              <div>
                {data.product_details.map((detail, index) => {
                  return (
                    <div className="top-textos">
                      <p>{detail.MARQUE}</p>
                      <p>{detail.TAILLE}</p>
                      <p>{detail.ÉTAT}</p>
                      <p>{detail.COULEUR}</p>
                      <p>{detail.EMPLACEMENT}</p>
                    </div>
                  );
                })}
                <div>
                  <hr></hr>
                  <div className="bottom-textos">
                    <p className="black">{data.product_name}</p>

                    <p>{data.product_description}</p>
                    <p>{data.owner.account.username}</p>
                    <button>Acheter</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
