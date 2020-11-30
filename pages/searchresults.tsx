import React from "react";
import Link from "../src/Link";
import Layout from "../src/Layout";
import styles from "../styles/dailyreport.module.scss";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";

const GET_RESERVATIONS = gql`
  query searchReservation(
    $fn: String
    $ln: String
    $pn: String
    $adrs: String
    $rNum: String
    $ckIn: date!
    $ckOut: date!
  ) {
    reservations(
      where: {
        _or: [
          { guest: { firstName: { _ilike: $fn } } }
          { guest: { lastName: { _ilike: $ln } } }
          { guest: { phoneNum: { _ilike: $pn } } }
          { guest: { streetAddress: { _ilike: $adrs } } }
          { roomNum: { _eq: $rNum } }
          { dateCheckIn: { _eq: $ckIn } }
          { dateCheckOut: { _eq: $ckOut } }
        ]
      }
    ) {
      roomNum
      guest {
        firstName
        lastName
        guestId
      }
      dateCheckIn
      dateCheckOut
    }
  }
`;

/**
 * @function SearchResults This screen will show the user relevant fields for what they searched, including: Guest First Name, Guest Last Name, Room Number, Check-In Date, Checkout Date.
 */
function SearchResults() {
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

  const { loading, error, data, fetchMore } = useQuery(GET_RESERVATIONS, {
    variables: {
      fn: fName,
      ln: lName,
      pn: phoneNum,
      adrs: streetNum,
      rNum: roomNum,
      ckIn: checkIn ? checkIn : "01/01/1998",
      ckOut: checkOut ? checkIn : "01/01/1998",
    },
  });

  return (
    //if results empty, print no results found message
    //otherwise show table
    //if user clicks guest name, post unique user id of guest to profile page
    <Layout>
      <div className={styles.header}>
        <h1>Search Results</h1>
      </div>

      <div className={styles.mainTableWrapper}>
        {data && (
          <table className={styles.mainTable}>
            <tbody>
              <tr>
                <th>
                  <h1> Room Number </h1>
                </th>
                <th>
                  <h1> Guest Name</h1>{" "}
                </th>
                <th>
                  <h1> Date In </h1>
                </th>
                <th>
                  <h1> Date Out </h1>
                </th>
              </tr>

              {data.reservations.map((value, idx: number) => (
                <tr key={idx}>
                  <th>
                    <span> {value.roomNum} </span>{" "}
                  </th>
                  <th>
                    <Link
                      href={`/profile/${encodeURIComponent(
                        value.guest.guestId
                      )}`}
                    >
                      {value.guest.firstName} {value.guest.lastName}
                    </Link>{" "}
                  </th>
                  <th>
                    <span> {value.dateCheckIn} </span>
                  </th>
                  <th>
                    <span> {value.dateCheckOut} </span>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(SearchResults);
