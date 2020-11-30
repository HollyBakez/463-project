import React from "react";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
// Layout
import Layout from "../src/Layout";
// Material UI Stuff
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import styles from "../styles/dailyreport.module.scss";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";
// This screen will show a report of the day’s activity.  It will show a list of rooms that were rented that day and also have the following information for each room: Room Number, Guest Name, Date In, Date Out (If Checked Out), Amount Paid for the room. At the bottom will be a total of dollars paid for rooms that day.

const currDate = new Date().toISOString();

const GET_DAILY_REPORT = gql`
  query DailyReport($currDate: date!) {
    reservations_aggregate(
      where: {
        _and: {
          dateCheckIn: { _lte: $currDate }
          dateCheckOut: { _gte: $currDate }
        }
      }
    ) {
      aggregate {
        sum {
          amountPaid
        }
      }
    }
    reservations(
      where: {
        _and: {
          dateCheckIn: { _lte: $currDate }
          dateCheckOut: { _gte: $currDate }
        }
      }
    ) {
      roomNum
      guest {
        firstName
        lastName
      }
      dateCheckIn
      dateCheckOut
      amountPaid
    }
  }
`;

function DailyReport() {
  const { loading, error, data, fetchMore } = useQuery(GET_DAILY_REPORT, {
    variables: { currDate },
  });

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Daily Report</h1>
      </div>
      {data && (
        <div>
          <div className={styles.mainTableWrapper}>
            <table className={styles.mainTable}>
              <tbody>
                <tr>
                  <th>
                    <h1> Room # </h1>
                  </th>
                  <th>
                    <h1> Guest Name </h1>
                  </th>
                  <th>
                    <h1> Date In </h1>
                  </th>
                  <th>
                    <h1> Date Out </h1>
                  </th>
                  <th>
                    <h1> Amount Paid </h1>
                  </th>
                </tr>
                {data.reservations.map((value, idx) => (
                  <tr key={idx}>
                    <th>
                      <span> {value.roomNum} </span>{" "}
                    </th>
                    <th>
                      <span>
                        {value.guest.firstName} {value.guest.lastName}
                      </span>
                    </th>
                    <th>
                      <span> {value.dateCheckIn} </span>
                    </th>
                    <th>
                      <span> {value.dateCheckOut} </span>
                    </th>
                    <th>
                      <span> {value.amountPaid} </span>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className={styles.header}>
            Total Dollars:{" "}
            {data.reservations_aggregate.aggregate.sum.amountPaid}
          </h2>
        </div>
      )}
      <Button href="/" size="large" variant="contained" color="primary">
        Return to Main Menu
      </Button>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(DailyReport);
