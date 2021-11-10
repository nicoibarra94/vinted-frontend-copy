import axios from "axios";
import { useState, useEffect } from "react";
import homeImage from "./images/home-vinted.jpeg";
import Offers from "./Offers";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
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
      <img src={homeImage} alt="" />
      <div>
        <Offers data={data} />
      </div>
    </div>
  );
};

export default Home;
