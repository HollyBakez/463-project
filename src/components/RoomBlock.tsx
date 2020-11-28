import React from "react";
import { roomType } from "../models/room";
import styles from "../../styles/components/roomBlock.module.scss";

const RoomBlock = ({ status, roomNum, children }) => {
  const statusName = roomType[status].short;
  const colorOpt = {
    0: "#3DCE6E",
    1: "#E7F53C",
    2: "#B2840D",
    3: "#C4C4C4",
  };

  return (
    <div
      style={{ backgroundColor: colorOpt[status] }}
      className={styles.roomBlock}
    >
      <span className={styles.roomNum}>{roomNum}</span>
      <span className={styles.roomType}>{children}</span>
      <span className={styles.roomStatus}>{statusName}</span>
    </div>
  );
};

export default RoomBlock;
