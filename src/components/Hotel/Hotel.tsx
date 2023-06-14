import HotelType from "../../types/HotelType";
import Rating from "@mui/material/Rating";
import { useEffect, useId, useState } from "react";
import "./Hotel.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import axios from "axios";

import Room from "../Room/Room";
import { RoomType } from "../../types/RoomType";

const Hotel = ({
  hotel,
  children,
  adults,
}: {
  hotel: HotelType;
  children: number;
  adults: number;
}) => {
  const CreateID = () => {
    const photoId = useId();
    return photoId;
  };

  const [rooms, setRooms] = useState([]);
  const [roomsFiltered, setRoomsFiltered] = useState([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotel.id}`)
      .then(function (response) {
        setRooms(response.data.rooms);
        console.log(response.data.rooms);
      })
      .catch(function (error) {
        setError(true);
      });
  }, [hotel.id]);

  useEffect(() => {
    setRoomsFiltered(rooms);
  }, [setRooms, rooms]);

  useEffect(() => {
    const actualRooms = rooms;
    const filteredRooms = actualRooms.filter(
      (r: RoomType) =>
        children <= r.occupancy.maxChildren && adults <= r.occupancy.maxAdults
    );
    setRoomsFiltered(filteredRooms);
  }, [children, adults, rooms]);

  return (
    <>
      <article className="hotel">
        <div className="hotel__header">
          <div className="hotel__images">
            <Swiper>
              {hotel.images.map((image) => (
                <SwiperSlide key={CreateID()}>
                  <img
                    className="hotel__image"
                    src={image.url}
                    width="200"
                    height="200"
                    alt=""
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="hotel__details">
            <h3 className="hotel__title">{hotel.name}</h3>
            <p className="hotel__address">{hotel.address1}</p>
            <p className="hotel__address">{hotel.address2}</p>
          </div>
          <div className="hotel__rating">
            <Rating
              name="simple-controlled"
              value={+hotel.starRating}
              readOnly
            />
          </div>
        </div>
        <div className="hotel__rooms">
          {error && <p>We can not load rooms</p>}
          {!error &&
            roomsFiltered.map((room: RoomType, index) => (
              <Room
                key={`${index}-room`}
                room={room}
                children={children}
                adults={adults}
              />
            ))}
        </div>
      </article>
    </>
  );
};

export default Hotel;
