import React, { useState } from "react";
import Layout from "../../src/Layout";
import styles from "../../styles/stayinfo.module.scss";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import apolloClient from "../../src/apolloClient";
import { differenceInDays, format } from "date-fns";
import Link from "../../src/Link";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { roomNumArr } from "../../src/models/room";
// Capability 6

const currDate = new Date().toISOString();

const UPDATE_RESERVATION = gql`
  mutation UpdateReservation(
    $reservationId: uuid!
    $dateCheckIn: date!
    $dateCheckOut: date!
    $checkInTime: timetz!
    $checkOutTime: timetz!
    $roomNum: String!
    $rate: numeric!
    $amountPaid: numeric
  ) {
    update_reservations_by_pk(
      pk_columns: { reservationId: $reservationId }
      _set: {
        checkInTime: $checkInTime
        checkOutTime: $checkOutTime
        dateCheckIn: $dateCheckIn
        dateCheckOut: $dateCheckOut
        roomNum: $roomNum
        rate: $rate
        amountPaid: $amountPaid
      }
    ) {
      guestId
      reservationId
    }
  }
`;

const RESERVATION_CHECK_IN = gql`
  mutation MyMutation($reservationId: uuid!, $checkedIn: Boolean!) {
    update_reservations_by_pk(
      pk_columns: { reservationId: $reservationId }
      _set: { checkedIn: $checkedIn }
    ) {
      checkedIn
    }
  }
`;

const CHANGE_ROOM_STATUS = gql`
  mutation MyMutation($roomNum: String!, $status: numeric!, $clean: Boolean!) {
    update_rooms_by_pk(
      pk_columns: { roomNum: $roomNum }
      _set: {
        status: $status
        bathroom: $clean
        bedsheets: $clean
        dusting: $clean
        electronics: $clean
        vacuum: $clean
        towels: $clean
      }
    ) {
      status
    }
  }
`;

const INSERT_RESERVATION = gql`
  mutation InsertReservation(
    $roomNum: String!
    $dateMade: date!
    $dateCheckOut: date!
    $dateCheckIn: date!
    $checkOutTime: timetz!
    $checkInTime: timetz!
    $lastName: String!
    $firstName: String!
    $rate: numeric!
    $amountPaid: numeric!
  ) {
    insert_reservations_one(
      object: {
        roomNum: $roomNum
        checkInTime: $checkInTime
        checkOutTime: $checkOutTime
        dateCheckIn: $dateCheckIn
        dateCheckOut: $dateCheckOut
        dateMade: $dateMade
        guest: { data: { firstName: $firstName, lastName: $lastName } }
        rate: $rate
        checkedIn: true
        amountPaid: $amountPaid
      }
    ) {
      reservationId
      guestId
    }
  }
`;

const GET_RESERVATION_BY_PK = gql`
  query ReservationQuery($reservationId: uuid!) {
    reservations_by_pk(reservationId: $reservationId) {
      amountPaid
      checkedIn
      dateCheckIn
      dateCheckOut
      checkInTime
      checkOutTime
      room {
        roomNum
        type
      }
      rate
      guest {
        firstName
        guestId
        lastName
        profileImage
      }
      guestId
    }
  }
`;

function StayInfo() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());
  const [roomNum, setRoomNum] = useState("101");
  const [rate, setRate] = useState(null);
  const [paymentMade, setPaymentMade] = useState(0);

  const router = useRouter();

  const { reservationId } = router.query;

  let data, loading, error, fetchMore;
  if (reservationId !== "newCheckIn") {
    ({ loading, error, data, fetchMore } = useQuery(GET_RESERVATION_BY_PK, {
      variables: {
        reservationId,
      },
      onCompleted: (data) => {
        initForm(data);
      },
    }));
  }

  const [updateReservation] = useMutation(UPDATE_RESERVATION, {
    variables: {
      reservationId,
      dateCheckIn: checkInTime.toISOString(),
      dateCheckOut: checkOutTime.toISOString(),
      checkInTime: format(checkInTime, "HH:mm:XXX"),
      checkOutTime: format(checkOutTime, "HH:mm:XXX"),
      roomNum,
      rate,
      amountPaid: paymentMade,
    },
    refetchQueries: [
      { query: GET_RESERVATION_BY_PK, variables: { reservationId } },
    ],
  });

  const [insertReservation] = useMutation(INSERT_RESERVATION, {
    variables: {
      firstName,
      lastName,
      dateCheckIn: checkInTime.toISOString(),
      dateCheckOut: checkOutTime.toISOString(),
      checkInTime: format(checkInTime, "HH:mm:XXX"),
      checkOutTime: format(checkOutTime, "HH:mm:XXX"),
      roomNum,
      rate,
      amountPaid: paymentMade,
      dateMade: currDate,
    },
    onCompleted: ({ insert_reservations_one }) => {
      redirectToStayInfo(insert_reservations_one);
    },
  });

  const redirectToStayInfo = async (val) => {
    window.location.replace(`/stayinfo/${val.reservationId}`);
  };

  const [changeRoomStatus] = useMutation(CHANGE_ROOM_STATUS);

  const [reservationCheckIn] = useMutation(RESERVATION_CHECK_IN, {
    refetchQueries: [
      { query: GET_RESERVATION_BY_PK, variables: { reservationId } },
    ],
  });

  const initForm = (data) => {
    setCheckInTime(
      new Date(
        Date.parse(
          data.reservations_by_pk.checkInTime
            ? `${data.reservations_by_pk.dateCheckIn} ${data.reservations_by_pk.checkInTime}`
            : data.reservations_by_pk.dateCheckIn
        )
      ) || new Date()
    );
    setCheckOutTime(
      new Date(
        Date.parse(
          data.reservations_by_pk.checkOutTime
            ? `${data.reservations_by_pk.dateCheckOut} ${data.reservations_by_pk.checkOutTime}`
            : data.reservations_by_pk.dateCheckOut
        )
      ) || new Date()
    );
    setRoomNum(data.reservations_by_pk.room.roomNum || "");
    setRate(data.reservations_by_pk.rate || "");
    setPaymentMade(data.reservations_by_pk.amountPaid || 0);
  };

  const handleCheckIn = (checkedIn: boolean, roomNum: string) => {
    reservationCheckIn({ variables: { reservationId, checkedIn: !checkedIn } });
    changeRoomStatus({
      variables: { roomNum, status: checkedIn ? 2 : 1, clean: !checkedIn },
    });
  };

  const handleNewCheckIn = (event) => {
    insertReservation();
  };

  const handleChange = (event) => {
    // if to find
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
    } else if (event.target.name === "lastName") {
      setLastName(event.target.value);
    } else if (event.target.name === "roomRate") {
      setRate(event.target.value);
    } else if (event.target.name === "roomnum") {
      setRoomNum(event.target.value);
    } else if (event.target.name === "paymentMade") {
      setPaymentMade(event.target.value);
    } else {
    }
  };

  return (
    <Layout>
      <div className={styles.header}>
        <h1>Stay Info</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {(data || reservationId === "newCheckIn") && (
          <Card style={{ width: 700 }}>
            <div className={styles.avatar}>
              <img src="/assets/default-user.png" alt="Leo" />
            </div>
            <div className={styles.centertext}>
              {reservationId !== "newCheckIn" && (
                <Link href={`/profile/${data.reservations_by_pk.guestId}`}>
                  <h2>{`${data.reservations_by_pk.guest.firstName} ${data.reservations_by_pk.guest.lastName}`}</h2>
                </Link>
              )}
              {reservationId === "newCheckIn" && (
                <div>
                  <h2>New Guest</h2>{" "}
                  <label className={styles.fields}>
                    First Name:{" "}
                    <input
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                    ></input>
                  </label>
                  <label className={styles.fields}>
                    Last Name:
                    <input
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                    ></input>
                  </label>
                </div>
              )}
              <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                label="Check-In Time"
                value={checkInTime}
                onChange={setCheckInTime}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
              />
              <KeyboardDateTimePicker
                variant="inline"
                ampm={false}
                label="Check-In Time"
                value={checkOutTime}
                onChange={setCheckOutTime}
                onError={console.log}
                format="yyyy/MM/dd HH:mm"
              />
              <label className={styles.fields}>
                Room Number
                <select
                  name="roomnum"
                  id="roomnum-label"
                  value={roomNum ? roomNum : "101"}
                  onChange={handleChange}
                >
                  {roomNumArr.map((value, idx) => (
                    <option value={value.toString()} key={idx}>
                      {" "}
                      {value}
                    </option>
                  ))}
                </select>
              </label>

              {reservationId !== "newCheckIn" && (
                <label className={styles.fields}>
                  Room Type: <span>{data.reservations_by_pk.room.type}</span>
                </label>
              )}
              <label className={styles.fields}>
                Room Rate ($/Day):{" "}
                <input
                  name="roomRate"
                  value={rate}
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Total Charge:{" "}
                <input
                  readOnly
                  name="totalCharge"
                  value={
                    rate *
                    differenceInDays(
                      new Date(checkOutTime),
                      new Date(checkInTime)
                    )
                  }
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Payments Made:{" "}
                <input
                  name="paymentMade"
                  value={paymentMade}
                  onChange={handleChange}
                ></input>
              </label>
              <label className={styles.fields}>
                Balance:{" "}
                <input
                  name="balance"
                  value={
                    rate *
                      differenceInDays(
                        new Date(checkOutTime),
                        new Date(checkInTime)
                      ) -
                    paymentMade
                  }
                  onChange={handleChange}
                ></input>
              </label>
              {reservationId !== "newCheckIn" && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={
                      !roomNum || !rate || !checkInTime || !checkOutTime
                    }
                    onClick={() => {
                      updateReservation();
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      handleCheckIn(
                        data.reservations_by_pk.checkedIn,
                        data.reservations_by_pk.room.roomNum
                      );
                    }}
                  >
                    {data.reservations_by_pk.checkedIn
                      ? "Check Out"
                      : "Check In"}
                  </Button>
                </div>
              )}
              {reservationId === "newCheckIn" && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNewCheckIn}
                    disabled={
                      !roomNum ||
                      !rate ||
                      !checkInTime ||
                      !checkOutTime ||
                      !firstName ||
                      !lastName
                    }
                  >
                    Check In
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default apolloClient({ ssr: true })(StayInfo);
