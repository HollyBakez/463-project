import React from 'react';
import { roomType } from '../models/room';
import styles from '../../styles/components/DayColumn.module.scss'
const DayColumn = ({roomOccupyList, children}) => {

  // Assuming roomOccupyList = [{roomNum, guestName},{roomNum, guestName}]
  return (
    <div>
      <h1>{children}</h1>
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
