import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-test-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const userToken = Cookies.get("userToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);
    const stripeReponse = await stripe.createToken(cardElement, {
      name: userToken,
    });

    const stripeToken = stripeReponse.token.id;

    const response = await axios.post(
      "https://vinted-test-api.herokuapp.com/payment",
      {
        stripeToken: stripeToken,
        price: data.product_price,
        name: data.product_name,
      }
    );

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div>
      {!completed && data ? (
        <div className="checkoutform-background">
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <p>Résumé de la commande</p>
              </div>
              <div className="checkoutform-details-box">
                <div className="checkoutform-details">
                  <p>Commande</p>
                  <span>{data.product_price} €</span>
                </div>
                <div className="checkoutform-details">
                  <p>Frais protection acheteurs</p>
                  <span>0.40 €</span>
                </div>
                <div className="checkoutform-details">
                  <p>Frais de port</p>
                  <span>0.80 €</span>
                </div>
              </div>

              <hr />
              <div className="checkoutform-total">
                <p>Total</p>
                <span>{data.product_price + 1.2} €</span>
              </div>
              <span id="checkoutform-final">
                Il ne vous reste plus qu'un étape pour vous offrir{" "}
                {data.product_name}. Vous allez payer {data.product_price + 1.2}
                € (frais de protection et frais de port inclus).
              </span>

              <hr />
            </div>
            <div className="checkoutform-card-section">
              <CardElement id="cardelement" />
              <button type="submit">Valider paiment</button>
            </div>
          </form>
        </div>
      ) : (
        <span> Paiment effectúe!</span>
      )}
    </div>
  );
};

export default CheckoutForm;
