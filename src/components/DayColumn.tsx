import React from "react";
import { roomType } from "../models/room";
import styles from "../../styles/components/DayColumn.module.scss";
const DayColumn = ({ roomOccupyList, children }) => {
  // Assuming roomOccupyList = [{roomNum, roomStatus, guestName},{roomNum, roomStatus, guestName}]
  return (
    <div>
      <h1>{children}</h1>
      {roomOccupyList.map((value) => (
        <div className={styles.roomContainer}>
          <a href="/stayinfo">
            <span>{value.roomNum}</span>
          </a>
          <span>{value.guestName}</span>
        </div>
      ))}
    </div>
  );
};

export default DayColumn;
