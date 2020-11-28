import React from "react";
import Grid from "@material-ui/core/Grid";
import Layout from "../src/Layout";
import RoomReservationCard from "../src/components/RoomReservationCard";
import styles from "../styles/reservations.module.scss";

// [NEEDS REFACTOR]

const reservations = () => {
  // array of reservation info objects
  const reservationInfo = [
    {
      roomNum: "101",
      dateMade: "1/10/20",
      dateCheckIn: "1/12/20",
      dateCheckOut: "1/23/20",
      roomType: "Q",
      rate: "100",
      totalCharge: "1230",
      website: "trivago.com",
      name: "Holland Ho",
    },
    {
      roomNum: "101",
      dateMade: "1/10/20",
      dateCheckIn: "1/12/20",
      dateCheckOut: "1/23/20",
      roomType: "Q",
      rate: "200",
      totalCharge: "2000",
      website: "trivago.com",
      name: "Tommy Lee",
    },
  ];
  // map runs a for loop through
  //the reservation info object and maps it to the
  // values
  return (
    <Layout>
      <main className={styles.root}>
        {reservationInfo.map((value) => (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item key={0}>
              <RoomReservationCard
                roomNum={value.roomNum}
                dateMade={value.dateMade}
                dateCheckIn={value.dateCheckIn}
                dateCheckOut={value.dateCheckOut}
                roomType={value.roomType}
                rate={value.rate}
                totalCharge={value.totalCharge}
                website={value.website}
              >
                {value.name}
              </RoomReservationCard>
            </Grid>
          </Grid>
        ))}
      </main>
    </Layout>
  );
};

export default reservations;
