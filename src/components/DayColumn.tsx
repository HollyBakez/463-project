import React from "react";
import styles from "../../styles/components/DayColumn.module.scss";
import Link from "../Link";
import { isToday } from "date-fns";
import { roomNumArr } from "../models/room";

const DayColumn = ({ roomOccupyList, day, children }) => {
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
      {roomNumArr.map((room) => {
        const currentRoom = getRoom(room.toString());
        return (
          <div className={styles.roomContainer} key={room}>
            <Link
              href={
                currentRoom
                  ? `/stayinfo/${currentRoom.reservationId}`
                  : isToday(new Date(day))
                  ? `/stayinfo/newCheckIn`
                  : `/reservations?newRes=true`
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
