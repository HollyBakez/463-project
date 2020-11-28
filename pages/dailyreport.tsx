import React from "react";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
// Layout
import Layout from "../src/Layout";
// Material UI Shtuff
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styles from "../styles/dailyreport.module.scss";

// This screen will show a report of the day’s activity.  It will show a list of rooms that were rented that day and also have the following information for each room: Room Number, Guest Name, Date In, Date Out (If Checked Out), Amount Paid for the room. At the bottom will be a total of dollars paid for rooms that day.

export default function DailyReport() {
  const info = [
    {
      roomNum: 101,
      guestName: "cap no",
      dateIn: 101010,
      dateOut: 101110,
      amountPaid: 10,
    },
    {
      roomNum: 102,
      guestName: "nap co",
      dateIn: 101210,
      dateOut: 101310,
      amountPaid: 15.02,
    },
  ];

  //stores the total amount
  var total_dollars = 0;

  //add value.amountPaid to total_dollars
  info.map((value, idx) => (total_dollars = total_dollars + value.amountPaid));

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Daily Report</h1>
      </div>

      <div className={styles.mainTableWrapper}>
        <table className={styles.mainTable}>
          <tr>
            <th>
              {" "}
              <h1> Room # </h1>{" "}
            </th>
            <th>
              {" "}
              <h1> Guest Name </h1>{" "}
            </th>
            <th>
              {" "}
              <h1> Date In </h1>
            </th>
            <th>
              {" "}
              <h1> Date Out </h1>
            </th>
            <th>
              {" "}
              <h1> Amount Paid </h1>
            </th>
          </tr>

          {info.map((value, idx) => (
            <tr>
              <th>
                {" "}
                <span> {value.roomNum} </span>{" "}
              </th>
              <th>
                {" "}
                <span> {value.guestName} </span>{" "}
              </th>
              <th>
                {" "}
                <span> {value.dateIn} </span>{" "}
              </th>
              <th>
                {" "}
                <span> {value.dateOut} </span>{" "}
              </th>
              <th>
                {" "}
                <span> {value.amountPaid} </span>{" "}
              </th>
            </tr>
          ))}
        </table>
      </div>
      <h2 className={styles.header}>Total Dollars: {total_dollars}</h2>
      <Button href="/" size="large" variant="contained" color="primary">
        Return to Main Menu
      </Button>
    </Layout>
  );
}
