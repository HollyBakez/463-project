import React from "react";
// Layout
import Layout from "../src/Layout";

// Material UI Shtuff
import Grid from "@material-ui/core/Grid";

import styles from "../styles/roomStayList.module.scss";
import DayColumn from "../src/components/DayColumn";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";
import { addDays, format } from "date-fns";

var days = Array.from({ length: 7 }, (_, i) =>
  addDays(new Date(), i).toISOString()
);

const GET_RESERVATION_BY_DATE = gql`
  query GetReservationsByDate($currDate: date!) {
    reservations(
      where: {
        _and: {
          dateCheckIn: { _lte: $currDate }
          dateCheckOut: { _gte: $currDate }
        }
      }
      order_by: { room: { roomNum: asc } }
    ) {
      room {
        roomNum
        status
      }
      guest {
        firstName
        lastName
      }
      reservationId
    }
  }
`;

// Capability 2
// 4 States:
// 1) Guests checked in -- unavailable, display stay info (cap 6)
// click on guest -> pass id -> [guestIdRoom].tsx

// 3) Empty, no reservation, if today() -- available, display blank form to check in(cap 6)
// click
// 4) Empty, no reservation, if future() -- make a form to get info to create new reservations (cap 3)

// States: Empty, Reservation(not checked in), Checked-in

function RoomStayList() {
  // Will trigger query at most 42 times
  const result = days.reduce((map, day) => {
    map[day] = useQuery(GET_RESERVATION_BY_DATE, {
      variables: { currDate: day },
    });
    return map;
  }, {});

  return (
    <Layout>
      <h1 className={styles.header}> Room Stay List </h1>
      <Grid container justify="center" spacing={4}>
        {days.map((day) => (
          <Grid item key={day}>
            <DayColumn roomOccupyList={result[day].data} day={day}>
              {format(new Date(day), "LLLL do")}
            </DayColumn>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(RoomStayList);
