import React, { useEffect } from "react";
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
import Grid from "@material-ui/core/Grid";

import styles from "../styles/roomStayList.module.scss";
import DayColumn from "../src/components/DayColumn";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../src/apolloClient";
import { addDays, format } from "date-fns";

var days = Array.from({ length: 7 }, (_, i) =>
  addDays(new Date(), i).toISOString()
);

days[0] = "10/23/20";

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

  const rooms = [
    {
      date: "October 30",
      roomOccupyList: [
        { roomNum: 101, roomStatus: "checked-in", guestName: "Bob Sanchez" },
        {
          roomNum: 102,
          roomStatus: "checked-in",
          guestName: "Clarisee Patiss",
        },
      ],
    },
    {
      date: "October 31",
      roomStatus: "reserved",
      roomOccupyList: [
        { roomNum: 101, rtatus: "reserved", guestName: "John Govena" },
      ],
    },
    {
      date: "October 32",
      roomStatus: "empty",
      roomOccupyList: [{ roomNum: 101, romStatus: "empty", guestName: "" }],
    },
    {
      date: "October 33",
      roomStatus: "checked-in",
      roomOccupyList: [
        { roomNum: 101, rtus: "checked-in", guestName: "Fizz Gazoochi" },
      ],
    },
    {
      date: "October 34",
      roomStatus: "checked-in",
      roomOccupyList: [
        { roomNum: 101, rtus: "checked-in", guestName: "Shawn Leboo" },
      ],
    },
    {
      date: "October 35",
      roomStatus: "checked-in",
      roomOccupyList: [
        { roomNum: 101, rtus: "checked-in", guestName: "Welter Belcher" },
      ],
    },
    {
      date: "October 36",
      roomStatus: "reserved",
      roomOccupyList: [
        { roomNum: 101, rtatus: "reserved", guestName: "Goofy Goober" },
      ],
    },
  ];

  return (
    <Layout>
      <h1 className={styles.header}> Room Stay List </h1>
      <Grid container justify="center" spacing={4}>
        {days.map((day) => (
          <Grid item key={day}>
            <DayColumn roomOccupyList={result[day].data}>
              {format(new Date(day), "LLLL do")}
            </DayColumn>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(RoomStayList);
