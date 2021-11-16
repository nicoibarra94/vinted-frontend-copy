import { Navigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51JwQ3gCVhW56zcm6EW8ywkvD7BF5CN66pHN5fdajTmjCQX3TkrYSGDKTjWOkCIpW5ETcFpbueVBy9zfAQRc7zg4b00n0pmdbFC"
);

const Payment = ({ token }) => {
  const { id } = useParams();
  return token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm id={id} />
    </Elements>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Payment;
