import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import spinner from "./images/spinner.gif";
import Hero from "./components/Hero/Hero";
import Filter from "./components/Filter/Filter";
import Hotel from "./components/Hotel/Hotel";
import HotelType from "./types/HotelType";

function App() {
  const [rating, setRating] = useState<number>(1);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(1);

  const [hotels, setHotels] = useState([]);
  const [hotelsFiltered, setHotelsFiltered] = useState(hotels);

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG")
      .then(function (response) {
        setHotels(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setHotelsFiltered(hotels);
  }, [hotels]);

  useEffect(() => {
    const oldHotels = hotels;
    const newHotels = oldHotels.filter(
      (r: HotelType) => r.starRating >= rating
    );
    setHotelsFiltered(newHotels);
  }, [rating]);

  return (
    <div className="App">
      <div className="container">
        <Hero />
        <Filter
          rating={rating}
          setRating={setRating}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
        />

        {loading && (
          <img
            className="spinner"
            src={spinner}
            width="50"
            height="50"
            alt="loading"
          />
        )}
        {error && <p>Something went wrong.</p>}

        {!loading && (
          <div className="hotel-list">
            {hotelsFiltered.map((hotel: HotelType) => (
              <Hotel
                key={hotel.id}
                hotel={hotel}
                children={children}
                adults={adults}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
