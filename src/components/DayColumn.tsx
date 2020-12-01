import React from "react";
import { roomType } from "../models/room";
import styles from "../../styles/components/DayColumn.module.scss";
import Link from "../Link";

const rooms = [101, 102, 103, 104, 105];

const DayColumn = ({ roomOccupyList, children }) => {
  // Assuming roomOccupyList = [{roomNum, roomStatus, guestName},{roomNum, roomStatus, guestName}]

  const getRoom = (roomNum: string) => {
    if (!roomOccupyList || !roomOccupyList.reservations) return null;
    return roomOccupyList.reservations.find(
      (elm) => elm.room.roomNum === roomNum
    );
  };

  return (
    <div>
      <h1>{children}</h1>
      {rooms.map((room) => {
        const currentRoom = getRoom(room.toString());
        return (
          <div className={styles.roomContainer} key={room}>
            <Link
              href={
                currentRoom
                  ? `/stayinfo/${currentRoom.reservationId}`
                  : `/stayinfo/newCheckIn`
              }
            >
              {room}
            </Link>
            {currentRoom && (
              <span>{`${currentRoom.guest.firstName} ${currentRoom.guest.lastName}`}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DayColumn;
