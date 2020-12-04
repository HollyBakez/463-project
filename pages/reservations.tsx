import React, { useEffect } from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Layout from "../src/Layout";
import RoomReservationCard from "../src/components/RoomReservationCard";
import styles from "../styles/reservations.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { gql, useMutation, useQuery } from "@apollo/client";
import { differenceInDays, format } from "date-fns";
import apolloClient from "../src/apolloClient";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { useRouter } from "next/router";
import { roomNumArr } from "../src/models/room";

const currDate = new Date().toISOString();

const CREATE_RESERVATION = gql`
  mutation InsertReservation(
    $firstName: String!
    $lastName: String!
    $dateMade: date!
    $dateCheckIn: date!
    $dateCheckOut: date!
    $roomType: String!
    $website: String
    $roomNum: String!
    $rate: numeric!
  ) {
    insert_reservations_one(
      object: {
        guest: { data: { firstName: $firstName, lastName: $lastName } }
        dateMade: $dateMade
        dateCheckIn: $dateCheckIn
        dateCheckOut: $dateCheckOut
        website: $website
        rate: $rate
        roomNum: $roomNum
      }
    ) {
      dateMade
      amountPaid
      checkedIn
      dateCheckIn
      dateCheckOut
      guest {
        firstName
        lastName
        Email
        city
        guestId
        licenseId
        phoneNum
        profileImage
        state
        streetAddress
        vehicleLicensePlate
        zipCode
      }
      guestId
      rate
      reservationId
      website
      roomNum
    }
  }
`;

const DELETE_RESERVATION = gql`
  mutation DeleteReservation($reservationId: uuid!) {
    delete_reservations_by_pk(reservationId: $reservationId) {
      reservationId
    }
  }
`;

const GET_RESERVATIONS = gql`
  query GetReservations($checkIn: date!) {
    reservations(
      order_by: { dateCheckIn: asc }
      where: { dateCheckIn: { _gte: $checkIn } }
    ) {
      dateMade
      dateCheckIn
      dateCheckOut
      room {
        type
        roomNum
        status
      }
      rate
      website
      guest {
        firstName
        lastName
      }
      reservationId
    }
  }
`;

const reservations = () => {
  const router = useRouter();
  const { newRes } = router.query;

  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [dateMade, setDateMade] = useState(null);
  const [dateCheckIn, setDateCheckIn] = useState(null);
  const [dateCheckOut, setDateCheckOut] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [roomNum, setRoomNum] = useState(null);
  const [websiteReserved, setWebsiteReserved] = useState(null);
  const [rate, setRate] = useState(null);

  const { loading, data } = useQuery(GET_RESERVATIONS, {
    variables: { checkIn: currDate },
  });

  const [createReservation, { error }] = useMutation(CREATE_RESERVATION, {
    variables: {
      firstName: fName,
      lastName: lName,
      dateMade: dateMade ? dateMade : currDate,
      dateCheckIn,
      dateCheckOut,
      roomType: roomType ? roomType : "K",
      roomNum: roomNum ? roomNum : "101",
      website: websiteReserved,
      rate,
    },
    refetchQueries: [
      { query: GET_RESERVATIONS, variables: { checkIn: currDate } },
    ],
  });

  const [deleteReservation] = useMutation(DELETE_RESERVATION, {
    refetchQueries: [
      { query: GET_RESERVATIONS, variables: { checkIn: currDate } },
    ],
  });

  if (error) {
    alert(error);
    console.error(error);
  }

  useEffect(() => {
    if (newRes) {
      handleOpen();
    }
  }, []);

  // Guest First Name, Guest Last Name, Date Made, Date Checkin, Date Checkout, Room Type, ROOM NUMBER, Website Reserved, Rate ($/Day)

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const deleteReservationHandler = (event, reservationId: string): void => {
    event.stopPropagation();
    deleteReservation({ variables: { reservationId } });
  };

  const handleChange = (event) => {
    // if to find
    if (event.target.id === "firstname") {
      setFName(event.target.value);
    }
    if (event.target.id === "lastname") {
      setLName(event.target.value);
    }
    if (event.target.id === "datemade") {
      setDateMade(event.target.value);
    }
    if (event.target.id === "datecheckin") {
      setDateCheckIn(event.target.value);
    }
    if (event.target.id === "datecheckout") {
      setDateCheckOut(event.target.value);
    }
    if (event.target.name === "roomtype") {
      setRoomType(event.target.value);
    }
    if (event.target.name === "roomnum") {
      setRoomNum(event.target.value);
    }
    if (event.target.id === "websitereserved") {
      setWebsiteReserved(event.target.value);
    }
    if (event.target.id === "rate") {
      setRate(event.target.value);
    }
  };

  const submitHandler = (event) => {
    createReservation();
    handleClose();
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    })
  );
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add Reservation</h2>
      <div id="simple-modal-description">
        <form
          noValidate
          autoComplete="off"
          method="post"
          onSubmit={submitHandler}
        >
          <TextField
            fullWidth
            onChange={handleChange}
            id="firstname"
            label="First Name"
          />
          <TextField
            fullWidth
            onChange={handleChange}
            id="lastname"
            label="Last Name"
          />
          <TextField
            fullWidth
            onChange={handleChange}
            id="datemade"
            label="Date Made"
            value={
              dateMade ? dateMade : format(new Date(currDate), "MM/dd/yyyy")
            }
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="datecheckin"
            label="Date Check-in"
          />

          <TextField
            fullWidth
            onChange={handleChange}
            id="datecheckout"
            label="Date Check-out"
          />
          <InputLabel id="room-type-label">Room Type</InputLabel>
          <Select
            name="roomtype"
            onChange={handleChange}
            value={roomType ? roomType : "K"}
            labelId="room-type-label"
          >
            <MenuItem value={"K"}>K</MenuItem>
            <MenuItem value={"DQ"}>DQ</MenuItem>
            <MenuItem value={"DQK"}>DQK</MenuItem>
            <MenuItem value={"S"}>S</MenuItem>
          </Select>
          <InputLabel id="roomnum-label">Room Number</InputLabel>
          <Select
            name="roomnum"
            onChange={handleChange}
            value={roomNum ? roomNum : "101"}
            labelId="roomnum-label"
          >
            {roomNumArr.map((value, idx) => (
              <MenuItem value={value.toString()} key={idx}>
                {value}
              </MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            onChange={handleChange}
            id="websitereserved"
            label="Website Reserved"
          />

          <TextField fullWidth onChange={handleChange} id="rate" label="Rate" />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              !fName || !lName || !dateCheckIn || !dateCheckOut || !rate
            }
          >
            Add Reservation
          </Button>
        </form>
      </div>
    </div>
  );

  // map runs a for loop through
  //the reservation info object and maps it to the
  // values
  return (
    <Layout>
      <main className={styles.root}>
        <div className={styles.rsvrButton}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add Reservation
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>

        {data &&
          data.reservations.map((value, idx) => (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              key={idx}
            >
              <Grid item key={0}>
                <RoomReservationCard
                  roomNum={value.room.roomNum}
                  dateMade={value.dateMade}
                  dateCheckIn={value.dateCheckIn}
                  dateCheckOut={value.dateCheckOut}
                  roomType={value.room.type}
                  rate={value.rate}
                  reservationId={value.reservationId}
                  status={value.room.status}
                  totalCharge={
                    value.rate *
                    differenceInDays(
                      new Date(value.dateCheckOut),
                      new Date(value.dateCheckIn)
                    )
                  }
                  website={value.website}
                  handleDelete={(event) =>
                    deleteReservationHandler(event, value.reservationId)
                  }
                >
                  {`${value.guest.firstName} ${value.guest.lastName}`}
                </RoomReservationCard>
              </Grid>
            </Grid>
          ))}
      </main>
    </Layout>
  );
};

export default apolloClient({ ssr: true })(reservations);
