import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({ id }) => {
  const [data, setData] = useState();

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
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider paiment</button>
        </form>
      ) : (
        <span> Paiment effectúe!</span>
      )}
    </div>
  );
};

export default CheckoutForm;
