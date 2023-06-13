import { Dispatch, SetStateAction } from "react";

import "./Filter.scss";

import Rating from "@mui/material/Rating";

const Filter = ({
  rating,
  setRating,
  adults,
  setAdults,
  children,
  setChildren,
}: {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  children: number;
  setChildren: Dispatch<SetStateAction<number>>;
}) => {
  const handeIncrease = () => {
    if (adults < 10) {
      setAdults(adults + 1);
    }
  };

  const handeDecrease = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };

  const handeIncreaseChildren = () => {
    if (children < 10) {
      setChildren(children + 1);
    }
  };

  const handeDecreaseChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  return (
    <div className="filter">
      <div className="filter__col">
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newRating) => {
            if (newRating !== null) setRating(newRating);
          }}
        />
      </div>

      <div className="filter__col">
        <div className="input-number">
          <label htmlFor="adults">Adults:</label>
          <div className="input-number__controls">
            <button
              className="input-number__button"
              aria-label="Decrease"
              onClick={handeDecrease}
            >
              -
            </button>
            <input
              className="input-number__text"
              type="number"
              id="adults"
              value={adults}
              min="0"
              max="10"
              onChange={(e) => {
                setAdults(+e.currentTarget.value);
              }}
            />
            <button
              className="input-number__button"
              aria-label="Increase"
              onClick={handeIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="filter__col">
        <div className="input-number">
          <label htmlFor="adults">Children:</label>
          <div className="input-number__controls">
            <button
              className="input-number__button"
              aria-label="Decrease"
              onClick={handeDecreaseChildren}
            >
              -
            </button>
            <input
              className="input-number__text"
              type="number"
              id="adults"
              value={children}
              min="0"
              max="10"
              onChange={(e) => {
                setChildren(+e.currentTarget.value);
              }}
            />
            <button
              className="input-number__button"
              aria-label="Increase"
              onClick={handeIncreaseChildren}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
