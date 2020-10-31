import React from 'react';
import { roomType } from '../models/room';
import styles from '../../styles/components/DayColumn.module.scss'
const DayColumn = ({date, roomOccupyList}) => {

  // Assuming roomOccupyList = [{roomNum, guestName},{roomNum, guestName}]
  return (
    <div>
      <h1>{date}</h1>
      {roomOccupyList.map((value) => (
        <div className={styles.roomContainer}>
          <span>{value.roomNum}</span>
          <span>{value.guestName}</span>
        </div>
      ))}
    </div>
  )
}

export default DayColumn;
