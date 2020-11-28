import React from "react";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
// Layout
import Layout from "../src/Layout";
// Material UI Stuff <--
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styles from "../styles/dailyreport.module.scss";
import { useRouter } from "next/router";

/*
This screen will show the user relevant fields for what they searched, including: Guest First Name, Guest Last Name, Room Number, Check-In Date, Checkout Date. 
*/
export default function SearchResults() {
  const router = useRouter();

  const {
    fName,
    lName,
    roomNum,
    phoneNum,
    streetNum,
    checkIn,
    checkOut,
  } = router.query;

  console.log({
    fName,
    lName,
    roomNum,
    phoneNum,
    streetNum,
    checkIn,
    checkOut,
  });

  //query db for results
  const results = [];
  return (
    //if results empty, print no results found message
    //otherwise show table
    //if user clicks guest name, post unique user id of guest to profile page
    <Layout>
      <div className={styles.header}>
        <h1>Search Results</h1>
      </div>

      <div className={styles.mainTableWrapper}>
        <table className={styles.mainTable}>
          <tbody>
            <tr>
              <th>
                {" "}
                <h1> Room Number </h1>
              </th>
              <th>
                {" "}
                <h1> Guest Name</h1>{" "}
              </th>
              <th>
                {" "}
                <h1> Date In </h1>
              </th>
              <th>
                {" "}
                <h1> Date Out </h1>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
