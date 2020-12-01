import React, { useState } from "react";
import Layout from "../../src/Layout";
import styles from "../../styles/stayinfo.module.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import apolloClient from "../../src/apolloClient";
// Capability 6

const GET_RESERVATION_BY_PK = gql`
  query ReservationQuery($reservationId: uuid!) {
    reservations_by_pk(reservationId: $reservationId) {
      amountPaid
      checkedIn
      dateCheckIn
      dateCheckOut
      room {
        roomNum
        type
      }
      rate
      guest {
        firstName
        guestId
        lastName
      }
    }
  }
`;

function StayInfo() {
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [dateCheckIn, setDateCheckIn] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [dateCheckOut, setDateCheckOut] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [roomNum, setRoomNum] = useState(null);
  const [rate, setRate] = useState(null);
  const [totalCharge, setTotalCharge] = useState(null);
  const [paymentMade, setPaymentMade] = useState(null);

  const router = useRouter();

  const { reservationId } = router.query;

  console.log(reservationId);

  const { loading, error, data, fetchMore } = useQuery(GET_RESERVATION_BY_PK, {
    variables: {
      reservationId,
    },
  });

  console.log(data);

  const handleChange = (event) => {
    // if to find
    if (event.target.name === "guestFname") {
      setFName(event.target.value);
    } else if (event.target.name === "guestLname") {
      setLName(event.target.value);
    } else if (event.target.name === "checkInDate") {
      setDateCheckIn(event.target.value);
    } else if (event.target.name === "checkInTime") {
      setCheckInTime(event.target.value);
    } else if (event.target.name === "expCheckOutDate") {
      setDateCheckOut(event.target.value);
    } else if (event.target.name === "expCheckOutTime") {
      setCheckOutTime(event.target.value);
    } else if (event.target.name === "roomType") {
      setRoomType(event.target.value);
    } else if (event.target.name === "roomRate") {
      setRate(event.target.value);
    } else if (event.target.name === "roomNumber") {
      setRoomNum(event.target.value);
    } else if (event.target.name === "totalCharge") {
      setTotalCharge(event.target.value);
    } else if (event.target.name === "paymentMade") {
      setPaymentMade(event.target.value);
    } else {
      console.error("you messed up somewhere");
    }
  };

  const info = {
    guestFname: "Leonardo",
    guestLname: "Di-CAP",
    checkInDate: "10/31/20",
    checkInTime: "10:00 AM",
    expCheckOutDate: "11/05/20",
    expCheckOutTime: "11:00 AM",
    roomType: "DQ",
    roomNumber: "101",
    roomRate: "$50.00",
    totalCharge: "$250.00",
    paymentMade: "$100.00",
    balance: "$150.00",
  };

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Stay Info</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data && (
          <Card style={{ width: 700 }}>
            <div className={styles.avatar}>
              <img src="/assets/avatar.png" alt="Leo" />
            </div>
            <div className={styles.centertext}>
              <label className={styles.fields}>
                Guest First Name:{" "}
                <input
                  name="guestFname"
                  value={
                    fName ? fName : data.reservations_by_pk.guest.firstName
                  }
                  onChange={handleChange}
                ></input>
              </label>{" "}
              <label className={styles.fields}>
                Guest Last Name:{" "}
                <input
                  name="guestLname"
                  value={lName ? lName : data.reservations_by_pk.guest.lastName}
                  onChange={handleChange}
                ></input>
              </label>{" "}
              <label className={styles.fields}>
                Check-In Date:{" "}
                <input
                  name="checkInDate"
                  value={
                    dateCheckIn
                      ? dateCheckIn
                      : data.reservations_by_pk.dateCheckIn
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Check-In Time:
                <input
                  name="checkInTime"
                  value={
                    checkInTime
                      ? checkInTime
                      : data.reservations_by_pk.guest.checkInTime
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Expected Check-Out Date:
                <input
                  name="expCheckOutDate"
                  value={
                    dateCheckOut
                      ? dateCheckOut
                      : data.reservations_by_pk.dateCheckOut
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Expected Check-Out Time:{" "}
                <input
                  name="checkInTime"
                  value={
                    checkOutTime
                      ? checkOutTime
                      : data.reservations_by_pk.checkOutTime
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Room Type:{" "}
                <input
                  name="roomType"
                  value={roomType ? roomType : data.reservations_by_pk.roomType}
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Room Number:{" "}
                <input
                  name="roomNumber"
                  value={roomNum ? roomNum : data.reservations_by_pk.roomNum}
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Room Rate ($/Day):{" "}
                <input
                  name="roomRate"
                  value={rate ? rate : data.reservations_by_pk.rate}
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Total Charge:{" "}
                <input
                  name="totalCharge"
                  value={
                    totalCharge
                      ? totalCharge
                      : data.reservations_by_pk.totalCharge
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Payments Made:{" "}
                <input
                  name="paymentMade"
                  value={
                    paymentMade
                      ? paymentMade
                      : data.reservations_by_pk.paymentMade
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Balance:{" "}
                <input
                  name="balance"
                  value={info.balance}
                  onChange={handleChange}
                ></input>
              </label>
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(StayInfo);
