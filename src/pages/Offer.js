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
                  const keys = Object.keys(detail);
                  return (
                    <div className="top-textos" key={index}>
                      <p className="grey">{keys[0]}</p>
                      <p>{detail[keys[0]]}</p>
                    </div>
                  );
                })}
                <div>
                  <hr className="line"></hr>
                  <div className="bottom-textos">
                    <p className="black">{data.product_name}</p>

                    <p>{data.product_description}</p>
                    <p className="black">{data.owner.account.username}</p>
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
