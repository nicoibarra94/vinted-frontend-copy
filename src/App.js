import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import Cookies from "js-cookie";
import Offers from "./components/Offers";

library.add(faSearch);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState();
  const [isToggled, setIsToggled] = useState(false);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token);
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        token={token}
        setUser={setUser}
        search={search}
        setSearch={setSearch}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/offers/:title/:sort"
          element={<Offers search={search} isToggled={isToggled} />}
        />
        <Route path="/publish" element={<Publish />} />
        <Route path="/payment/:id" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
