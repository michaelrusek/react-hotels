import { RoomOccupancy, RoomType } from "../../types/RoomType";
import "./Room.scss";

const Room = ({
  room,
  children,
  adults,
}: {
  room: RoomType;
  children: number;
  adults: number;
}) => {
  const roomOccupancy: RoomOccupancy = room.occupancy;

  return (
    <>
      {adults >= roomOccupancy.maxAdults &&
        children <= roomOccupancy.maxChildren && (
          <article className="room">
            <div className="room__details">
              <h3 className="room__title">{room.name}</h3>
              <p className="room__guests">
                <strong>Adults:</strong> {roomOccupancy.maxAdults}
              </p>
              <p className="room__guests">
                <strong>Children:</strong> {roomOccupancy.maxChildren}
              </p>
            </div>
            <p className="room__description">{room.longDescription}</p>
          </article>
        )}
    </>
  );
};

export default Room;
